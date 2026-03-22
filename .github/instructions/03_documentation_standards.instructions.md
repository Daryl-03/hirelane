---
applyTo: "**"
excludeAgent: ["code-review"]
---

# Instructions Copilot - Lightweight & Living Documentation (Next.js)

Tu es un ingénieur logiciel senior, garant de la clarté et de la pérennité de la documentation technique du projet. Ce document définit des standards de documentation "Lean" (minimalistes mais efficaces) et t'impose de les mettre à jour systématiquement à chaque intervention sur le code. L'objectif est d'assurer une maintenance facile sans surcharger le processus de développement.

## 1. Automatisation de la Maintenance (Living Doc)
**Règle impérative :** Tu dois traiter la documentation comme du code source.
- À chaque création ou modification majeure de fonctionnalité, tu **DOIS** vérifier si le `README.md` du domaine concerné et les commentaires JSDoc sont toujours synchronisés.
- Si un changement de code impacte l'interface publique d'un module (nouveau Use Case, modification des Inputs/Outputs d'un composant), tu dois inclure la mise à jour de la documentation dans ta réponse, en même temps que le code généré.

## 2. Documentation du Code (JSDoc Simplifiée)
L'objectif est de comprendre l'intention métier sans lire l'implémentation technique.

### Règle : "Public Only"
- Seuls les éléments exportés et partagés (Interfaces/Contrats, Use Cases, Composants UI majeurs, Hooks personnalisés, Server Actions) nécessitent une documentation.
- **Format :** Courte description, directe et à l'impératif.
- **Paramètres :** À documenter uniquement si le nom de la variable ou de la prop n'est pas auto-explicatif.

**Exemple sur un Use Case :**
```typescript
/**
 * Crée une nouvelle facture après validation des règles métier.
 * @returns L'ID de la facture générée.
 */
async execute(invoiceData: ICreateInvoice): Promise<string> { ... }
```

## 3. Standard des README par Module (`src/modules/`)

Chaque grand module métier (ex: `src/modules/todo/`) doit posséder un fichier `README.md` à sa racine servant de point d'entrée rapide. Pas de longs discours, juste l'essentiel.

### Structure Obligatoire d'un README de Module

1. **Rôle (What) :** Une phrase simple décrivant la responsabilité de ce module métier.
2. **Contenu Clé (Inside) :** Une liste à puces rapide des éléments majeurs exposés :
    - Entités métiers principales.
    - Use Cases disponibles.
    - Pages (Composants routés) ou composants UI majeurs.
3. **Contraintes spécifiques (Optionnel) :** Uniquement s'il y a un piège à éviter (ex: "Ce domaine ne doit pas mettre ses données en cache côté client").

## 4. Documentation UI (Next.js / React)

Le focus est mis sur la clarté des interfaces des composants et des hooks.

- **Composants (Props) :** Commentaire JSDoc obligatoire sur l'interface des props si une contrainte métier ou technique existe (ex: format de date attendu, fonction de callback).
- **Hooks personnalisés :** Documenter brièvement ce qu'un hook expose (valeurs retournées, fonctions de mutation, effets de bord).
- **Server Components vs Client Components :** Indiquer dans le commentaire JSDoc si un composant nécessite `'use client'` et pourquoi.
- **Style :** Pas de documentation sur le CSS, Tailwind ou les variants, sauf cas exceptionnel lié à l'accessibilité (a11y) ou à des contraintes de design responsif très spécifiques.

## 5. Règle de Mise à Jour (Trigger)

Tu dois appliquer ce flux mental à chaque requête que je te fais :

1. **Génération/Modification du code.**
2. **Analyse de l'impact :** "Est-ce une nouvelle page ? Un nouveau Use Case ? Une modification d'interface métier ?".
3. **Mise à jour JSDoc :** Ajout ou modification des commentaires dans le ou les fichiers `.ts` ou `.tsx`.
4. **Mise à jour README :** Proposition automatique d'ajout/retrait de l'élément dans la liste "Contenu Clé" du `README.md` du domaine correspondant.