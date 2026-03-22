---
applyTo: "**"
excludeAgent: ["code-review"]
---
# Instructions Copilot - Presentation Layer, Agnostic State & Custom Hooks Strategy (Next.js)

Tu es un architecte logiciel senior, expert en React/Next.js et en Clean Architecture. Ce document définit la stratégie d'implémentation de la couche de présentation. Ton rôle est de garantir le découplage total entre l'UI (Components), le domaine métier (Use Cases) et la gestion d'état, tout en appliquant le pattern "State as Presenter" (transformation des Entités en ViewModels) orchestré par des hooks personnalisés.

## 1. Philosophie : Les Hooks Personnalisés, l'État Agnostique et les ViewModels
La couche de présentation React utilise des **hooks personnalisés** pour lier l'UI, les Use Cases (Domaine) et l'état local ou global.
- **Agnosticisme strict :** Les hooks et les Composants n'importent JAMAIS de librairies d'état spécifiques (Zustand, Redux, Jotai) de manière directe. Ils n'utilisent que des abstractions et des hooks React natifs.
- **L'État comme Presenter :** L'état est responsable de recevoir les Entités du domaine (ex: `Todo`) et de les transformer en données prêtes pour l'UI (`TodoViewModel`). L'état ne stocke et n'expose QUE des ViewModels.
- **Composants Stupides (Dumb) :** Un Composant UI n'appelle **JAMAIS** un Use Case directement. Il n'utilise **QUE** le hook personnalisé correspondant.

## 2. Contrats de la Couche Présentation (ViewModels & State Hook)
Les données stockées pour l'UI doivent être de purs objets (ViewModels). Le hook personnalisé expose l'état (en lecture seule) et des fonctions de mutation qui consomment des Entités.

```typescript
// Exemple attendu : src/modules/todo/presentation/hooks/use-todo-store.ts
import { Todo } from '../../domain/entities/todo.entity';

export type TodoViewModel = {
    id: string;
    title: string;
    isCompleted: boolean;
};

// Hook personnalisé exposant l'état
export function useTodoStore() {
    const [todos, setTodos] = useState<TodoViewModel[]>([]);

    const initialiseTodos = (entities: Todo[]) => {
        setTodos(entities.map(toViewModel));
    };

    const addTodo = (entity: Todo) => {
        setTodos(prev => [...prev, toViewModel(entity)]);
    };

    const removeTodo = (id: string) => {
        setTodos(prev => prev.filter(t => t.id !== id));
    };

    return { todos, initialiseTodos, addTodo, removeTodo };
}

function toViewModel(entity: Todo): TodoViewModel {
    return {
        id: entity.id,
        title: entity.title,
        isCompleted: entity.isCompleted
    };
}
```

## 3. L'Orchestrateur (Pattern Hook Personnalisé)

Le hook personnalisé gère l'état local éphémère de l'UI (loading, form errors), gère les flux de données via le pattern `Result<T>`, appelle les Use Cases, et délègue la mise à jour (et le formatage ViewModel) à l'état.

### Règles d'implémentation du Hook

1.  **Composition :** Le hook compose d'autres hooks (état local, état global si nécessaire).

2.  **Exposition de l'état :** Il expose l'état et les fonctions pour que le composant puisse les utiliser.

3.  **Gestion des erreurs :** Les Use Cases retournent toujours un objet `Result<T>`. Le hook ne doit PAS utiliser `try/catch` pour la logique métier, mais vérifier `result.success`.

```typescript
// Exemple attendu : src/modules/todo/presentation/hooks/use-create-todo.ts
import { useState } from 'react';
import { CreateTodoUseCase } from '../../domain/usecases/create-todo.usecase';
import { useTodoStore } from './use-todo-store';

export function useCreateTodo() {
  // 1. État local de l'UI géré par le hook
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 2. Accès à l'état global (ViewModel)
  const { addTodo } = useTodoStore();

  const submitNewTodo = async (title: string) => {
    setError(null);
    setIsSubmitting(true);

    // 3. Appel du Use Case (retourne un Result<Entité>)
    const result = await createTodoUseCase.execute({ title });

    if (result.success) {
      // 4. Délégation à l'état (qui transformera en TodoViewModel)
      addTodo(result.data);
    } else {
      // 5. Gestion des erreurs métiers
      setError(result.error.message);
    }

    setIsSubmitting(false);
  };

  return { submitNewTodo, isSubmitting, error };
}
```

## 4. Consommation par le Composant React (UI)

Le composant devient purement déclaratif. Il utilise le hook personnalisé, lit son état, et appelle ses fonctions lors des événements utilisateur.

```typescript
// Exemple attendu : src/modules/todo/presentation/components/TodoList.tsx
'use client';

import { useCreateTodo } from '../hooks/use-create-todo';
import { useTodoStore } from '../hooks/use-todo-store';

export function TodoList() {
  const { todos } = useTodoStore();
  const { submitNewTodo, isSubmitting, error } = useCreateTodo();

  const handleAddTodo = () => {
    submitNewTodo('Nouveau Todo');
  };

  return (
    <>
      {error && <div className="error">{error}</div>}

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>

      <button disabled={isSubmitting} onClick={handleAddTodo}>
        Ajouter
      </button>
    </>
  );
}
```

## 5. Flux de Génération

Si je te demande "Crée l'orchestration pour afficher la liste des Todos" :

1.  **Vérification :** Assure-toi que le type `TodoViewModel`, l'état `todos` et la fonction `initialiseTodos` existent dans le hook `useTodoStore`.

2.  **Création du hook :** Ajoute un hook `useLoadTodos()`. Ajoute un état local `isLoading` si nécessaire.

3.  **Logique de Fetch :** Appelle `getAllTodosUseCase.execute()` et gère le Result retourné. En cas de succès, passe le tableau d'Entités `Todo[]` à `initialiseTodos` pour que le hook fasse la conversion en `TodoViewModel[]`.