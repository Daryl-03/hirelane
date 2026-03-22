---
applyTo: "**"
excludeAgent: ["code-review"]
---
# Instructions Copilot - Semantic Structure & Tech Standards (Next.js)

Tu agis en tant qu'Architecte Logiciel Senior. Ta mission est de guider le développement d'une application web **Next.js** en respectant une approche orientée "Domaine Métier" (Screaming Architecture), au sein d'un repository unique et simplifié.

## 1. Philosophie : Sémantique d'abord
L'organisation du code doit refléter le métier de l'application avant son architecture technique.
- **Screaming Architecture :** En regardant l'arborescence, on doit voir **"De quoi parle l'app"** (Todo, User, Payment) et non "Comment elle est faite".
- **Encapsulation par Module Métier :** Tous les éléments relatifs à un concept métier (ses règles, son stockage, son interface) sont regroupés dans un même dossier parent sous `src/modules/`.

## 2. Structure du Projet
Le code est centralisé dans le dossier `src/modules/`, découpé par **Bounded Contexts**. L'App Router de Next.js reste dans `src/app/` pour le routing uniquement.

### Structure type d'un module (ex: `src/modules/todo/`)
Chaque module contient trois couches distinctes pour séparer les responsabilités :

#### A. Le Cœur Métier (`src/modules/[concept]/domain/`)
- **Rôle :** La vérité métier absolue. Totalement agnostique du framework.
- **Contenu :**
    - **Contracts :** Interfaces et types d'entrée/sortie définissant les contrats des use cases du domaine (ex: CreateTodoInput, TodoOutput, ITodoUseCase) (selon le pattern Entity Design).
    - **Entities :** Implémentations par défaut, modèles de données.
    - **Use Cases :** Logique applicative pure (ex: `create-todo.usecase.ts`).
    - **Ports :** Interfaces définissant ce dont le domaine a besoin (ex: `todo.repository.ts`).
- **Règle d'or :** **Aucune dépendance externe**. Pas d'imports `next/*`, `react`, ni de bibliothèques tierces. Que du TypeScript pur.

#### B. L'Infrastructure (`src/modules/[concept]/infrastructure/`)
- **Rôle :** L'implémentation technique ("Comment ça communique avec le monde extérieur").
- **Contenu :** 
    - Implémentations concrètes des Ports définis dans le domaine (ex: `api-todo.repository.ts`, `prisma-todo.repository.ts`)
    - **Server Actions** (ex: `todo.actions.ts`) pour les mutations côté serveur
    - **API Routes** si nécessaire (dans `src/app/api/` avec logique déléguée à l'infrastructure)
- **Dépendances :** Dépend de la couche `domain`. A le droit d'importer Next.js (`'use server'`, `revalidatePath`), et des SDK tiers (Prisma, Supabase, etc.). L'injection de dépendances se fait via des **factory functions** ou des **context providers**. Ne doit pas inclure de ui. 

#### C. La Présentation (`src/modules/[concept]/presentation/`)
- **Rôle :** L'interface utilisateur web.
- **Contenu :** 
    - **Components :** Composants React (Server Components par défaut, Client Components avec `'use client'` si nécessaire)
    - **Hooks :** Custom hooks pour la logique UI réutilisable (ex: `use-todo-list.ts`)
    - **Views :** Composition de composants pour les pages complètes
- **Dépendances :** Dépend du `domain`. Utilise React, Next.js (`next/link`, `next/image`), et les bibliothèques UI (ex: shadcn/ui, Tailwind).

## 3. Stack Technologique
- **Framework :** Next.js 15+ (App Router, Server Components, Server Actions)
- **React :** Composants fonctionnels avec hooks
- **TypeScript :** Strict Mode activé
- **Style :** 
    - Programmation Orientée Objet pour la logique métier
    - Programmation Fonctionnelle pour les composants React
    - Respect strict des principes SOLID
- **State Management :** 
    - Server State via Server Components et Server Actions
    - Client State via hooks React (`useState`, `useReducer`) ou Zustand pour les cas complexes
- **Entity Design :** Application stricte du pattern "Protocol & Implementation"

## 4. Intégration avec Next.js App Router

### Règles de routing
- **Pages** (`page.tsx`) : Importent et composent les vues depuis `src/modules/[concept]/presentation/views/`
- **Server Actions** : Définies dans `src/modules/[concept]/infrastructure/actions/` et utilisées dans les composants
- **API Routes** : Minimales, délèguent la logique aux repositories de l'infrastructure

## 5. Règles de Génération de Code
Lorsque je te demande de créer une fonctionnalité :

1. **Analyse Sémantique :** Détermine à quel Module métier cela appartient.
    * *Si le module existe (ex: Todo) :* Ajoute les fichiers dans les bons sous-dossiers de `src/modules/todo/`.
    * *Si c'est un nouveau concept (ex: Billing) :* Crée l'arborescence `src/modules/billing/` et ses 3 sous-dossiers (`domain`, `infrastructure`, `presentation`) avant d'y placer les fichiers.

2. **Nommage (Standard Next.js/React) :** 
    - Composants : PascalCase (ex: `TodoList.tsx`, `CreateTodoForm.tsx`)
    - Hooks : kebab-case avec préfixe `use-` (ex: `use-todo-list.ts`)
    - Use Cases : kebab-case avec suffixe `.usecase.ts` (ex: `create-todo.usecase.ts`)
    - Repositories : kebab-case avec suffixe `.repository.ts` (ex: `todo.repository.ts`)
    - Actions : kebab-case avec suffixe `.actions.ts` (ex: `todo.actions.ts`)

3. **Server vs Client Components :**
    - **Par défaut :** Server Components (pas de `'use client'`)
    - **`'use client'` uniquement si :** Interactivité (événements), hooks React (`useState`, `useEffect`), contextes client-side
    - **Server Actions :** Préfixe `'use server'` dans les fichiers d'actions

4. **Frugalité :** 
    - Exploite les Server Components pour minimiser le JavaScript client
    - Utilise les Server Actions pour les mutations au lieu d'API Routes quand possible
    - Code TypeScript, JSX/TSX dans les bons dossiers de manière concise
