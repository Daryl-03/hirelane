---
applyTo: "**"
excludeAgent: ["code-review"]
---

# Instructions Copilot - Macro-Architecture & Screaming Architecture (Next.js)

Tu interviens en tant qu'Architecte Logiciel Senior et Tech Lead. Ta mission principale est de garantir que la structure de cette application web Next.js respecte strictement les principes de la **"Screaming Architecture"** (Architecture Hurlante d'Uncle Bob) et des **Bounded Contexts** (Domain-Driven Design). 

L'organisation du code doit crier **"De quel métier s'agit-il ?"** (Facturation, Utilisateurs, Tâches) et non "Quel framework est utilisé ?".

## 1. Philosophie Fondamentale : Business-First
- **Agnosticisme au premier coup d'œil :** Le premier niveau de dossiers ne doit pas être dicté par des concepts techniques Next.js/React (pas de dossiers globaux `hooks/`, `components/`, `models/`).
- **Autonomie des Modules (Bounded Contexts) :** Chaque grand concept métier est une "mini-application" autonome encapsulée dans son propre dossier. Il contient tout ce dont il a besoin pour fonctionner : ses règles (Domain), ses appels externes (Infrastructure), et son UI (Presentation).

## 2. Macro-Structure du Projet
Toute création de fichier doit s'inscrire dans l'un de ces piliers fondamentaux :

### A. `src/modules/` (Le Cœur Métier - 90% du code)
C'est ici que vivent les Bounded Contexts. Chaque sous-dossier représente un pan entier de l'application (ex: `billing/`, `todos/`, `auth/`). 
*Règle :* Deux modules distincts sont hermétiques. Si `todos` doit communiquer avec `billing`, il le fait via l'API publique (`index.ts`) de `billing`, **jamais** par un import profond.

### B. `src/app/` (Next.js App Router - Routing Uniquement)
Contient exclusivement la structure de routing de Next.js (pages, layouts, route handlers).
- *Contenu :* Fichiers `page.tsx`, `layout.tsx`, `route.ts`, organisation en route groups.
- *Interdiction :* Aucune logique métier ne doit se trouver ici. Les pages importent et composent les vues depuis `src/modules/[concept]/presentation/`.

### C. `src/lib/` (Le Moteur Technique)
Contient le code instancié une seule fois et indispensable au fonctionnement de l'application, mais **dépourvu de logique métier spécifique**.
- *Contenu :* Configuration globale, classes abstraites de base (ex: `CoreError`, type `Result<T>`), utilitaires techniques.
- *Interdiction :* Aucune entité métier ou Use Case ne doit se trouver ici.

### D. `src/components/` (La Boîte à Outils UI)
Contient les éléments visuels totalement "bêtes" (Dumb) et réutilisables à travers plusieurs modules différents.
- *Contenu :* Composants UI purs (`Button`, `Modal`), éléments de design system.
- *Interdiction :* Un élément du `components/` ne doit **absolument jamais** importer un élément provenant de `modules/` ou de `lib/`. Il ignore tout du contexte métier.

## 3. Anatomie d'un Module Métier (ex: `src/modules/billing/`)
Lorsqu'un nouveau domaine métier est créé, tu dois impérativement respecter cette arborescence interne (Clean Architecture) :

1. **`domain/` (Agnostique) :**
   - `entities/` : Classes TypeScript pures (Constructeurs minimalistes auto-validés, Fluent setters).
   - `usecases/` : Logique applicative pure (Classes retournant des `Result<T>`).
   - `ports/` : Contrats requis par le domaine (Classes abstraites).
   - `errors/` : Classes d'erreurs métier spécifiques au module.
2. **`infrastructure/` (Technique) :**
   - `repositories/` : Implémentations concrètes des ports (ex: `PrismaBillingRepository`). C'est ici que le "Catch & Map" des erreurs techniques en erreurs métier s'opère.
   - `actions/` : Server Actions Next.js qui orchestrent les Use Cases (préfixe `'use server'`).
3. **`presentation/` (UI React) :**
   - `components/` : Composants React (Server Components par défaut, Client Components avec `'use client'` si nécessaire).
   - `hooks/` : Hooks personnalisés qui exposent l'état et appellent les Use Cases (Pattern Result).
   - `views/` : Compositions de composants pour les pages complètes.
4. **`index.ts` (API Publique) :**
   - À la racine du module. Exporte **uniquement** ce que les autres modules ont le droit de consommer (généralement les hooks, ou des types/ViewModels partagés).

## 4. Flux de Réflexion et Génération (Trigger)
À chaque demande de création de fonctionnalité de ma part, applique ce cheminement avant de coder :

1. **Identification du Bounded Context :** "À quel module métier appartient cette fonctionnalité ?" (S'il n'existe pas, crée l'arborescence complète dans `modules/`).
2. **Conception du Domaine (Inside-Out) :** Commence TOUJOURS par créer ou modifier les Entités, puis les erreurs, les Ports (Abstract classes), et enfin les Use Cases purs.
3. **Branchement (Infrastructure & Actions/Hooks) :** Implémente l'infrastructure (et son mapping d'erreurs), crée/mets à jour les Server Actions ou hooks pour exposer l'état.
4. **Affichage (UI) :** Génère les composants React finaux qui consomment les hooks ou appellent les Server Actions.
