---
applyTo: "**"
excludeAgent: ["code-review"]
---

# Instructions Copilot - Error Handling & Mapping Strategy (Next.js)

Tu es un architecte logiciel senior garant de la robustesse et du découplage de l'application. Ce document définit la stratégie stricte de gestion typée des erreurs. L'objectif absolu est de garantir qu'aucune erreur technique (issue de l'infrastructure, de Next.js, React ou de librairies tierces) ne fuite vers la couche UI ou la logique métier sans avoir été préalablement traduite dans le langage du Domaine.

## 1. Philosophie : "Domain-Defined Errors"
Les erreurs font partie du contrat métier. Le dossier `domain/` d'un concept doit définir toutes les classes d'erreurs qu'il est susceptible de lever.
L'Infrastructure traduit les erreurs techniques en erreurs métier. Le Use Case les attrape et les transforme en un objet `Result<T>`. L'UI (Présentation), via ses hooks personnalisés ou Server Actions, traite ce résultat pour mettre à jour l'interface sans jamais se soucier de l'implémentation technique sous-jacente.

## 2. Hiérarchie des Erreurs (Taxonomie)

### A. Base Commune (`src/lib/errors/`)
Toutes les erreurs personnalisées de l'application doivent hériter d'une classe de base `CoreError` (ou étendre l'`Error` native proprement) :
- **message :** Description claire (pour les logs et le debug).
- **code :** Chaîne de caractères unique pour le parsing (ex: `TODO_TITLE_EMPTY`).
- **metadata :** Objet optionnel pour le contexte (ex: `{ todoId: '123' }`).

### B. Erreurs d'Entité (dans `src/modules/[concept]/domain/errors/`)
Elles sont liées à la validité intrinsèque de la donnée.
- *Exemples :* `InvalidTodoTitleError`, `PastDueDateError`.
- *Levées par :* Les Entités (dans leurs constructeurs ou setters purs).

### C. Erreurs de Ports / Orchestration (dans `src/modules/[concept]/domain/errors/`)
Elles sont liées à l'échec d'une dépendance externe (API, base de données) ou à une règle de flux métier.
- *Exemples :* `TodoNotFoundError`, `UserNotAuthorizedError`, `StorageFailureError`.
- *Définies par :* Le Domaine.
- *Levées par :* **L'Infrastructure** (qui implémente les Ports).

## 3. Mécanisme de "Catch & Map" (Conversion Obligatoire dans l'Infra)
L'Infrastructure (ex: un Repository utilisant `fetch` ou Prisma) DOIT catcher ses propres erreurs techniques et les relancer sous forme d'erreurs définies par le Domaine.

**Exemple Obligatoire (Catch & Map avec fetch) :**

```typescript
// infrastructure/repositories/api-todo.repository.ts
export class ApiTodoRepository implements TodoRepository {
  async save(todo: Todo): Promise<void> {
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        body: JSON.stringify(todo),
      });
      
      if (!response.ok) {
        throw new Error('HTTP Error');
      }
    } catch (err) {
      // Conversion : Error technique -> StorageFailureError
      throw new StorageFailureError('Impossible de sauvegarder le Todo.', { cause: err });
    }
  }
}
```

## 4. Consommation par la Présentation (Hooks & React UI)

Règle absolue : Un Composant React ne communique JAMAIS directement avec un Use Case sans passer par un hook personnalisé ou une Server Action qui orchestre l'appel.

Les hooks personnalisés et les Composants n'utilisent PAS de try/catch lors de l'appel au Use Case. Ils inspectent le retour Result<T> dicté par le Use Case.

```typescript
// presentation/hooks/use-create-todo.ts
export function useCreateTodo() {
  const [error, setError] = useState<string | null>(null);
  
  const createTodo = async (title: string) => {
    setError(null); // Reset
    
    // Appel du Use Case, inspection du Pattern Result
    const result = await createTodoUseCase.execute({ title });
    
    if (!result.success) {
      // result.error contient le code et le message mappés par le Use Case
      if (result.error.code === 'INVALID_TITLE') {
        setError('Le titre ne peut pas être vide.');
      } else {
        setError(result.error.message || 'Une erreur est survenue.');
      }
      return null;
    }
    
    return result.data;
  };
  
  return { createTodo, error };
}

// presentation/components/TodoForm.tsx
'use client';

export function TodoForm() {
  const { createTodo, error } = useCreateTodo();
  
  const handleSubmit = async (title: string) => {
    const todo = await createTodo(title);
    
    if (todo) {
      // Succès : Redirection ou nettoyage du formulaire
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {error && <p>{error}</p>}
      {/* ... */}
    </form>
  );
}
```

## 5. Instructions de Génération

Lorsque tu génères une Entité, un Use Case ou une implémentation d'Infrastructure :

- **Analyse des risques :** Demande-toi systématiquement : "Qu'est-ce qui peut échouer ici ?".
- **Création :** Génère les classes d'erreurs correspondantes dans src/modules/[concept]/domain/errors/.
- **Documentation :** Utilise le tag @throws {NomDeLErreur} dans la JSDoc de l'interface du Port ou de la méthode pour expliciter le contrat d'erreur, afin que le Use Case sache quoi intercepter pour son Result<T>.
