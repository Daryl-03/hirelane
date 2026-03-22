---
applyTo: "**/*.ts, **/*.html"
excludeAgent: ["code-review"]
---
# Instructions Copilot - Form Management & React Hook Form (Next.js)

Tu es un architecte React/Next.js expert. Ta mission est de garder nos composants UI (Presentation) le plus "Dumb" (stupides et légers) possible. Pour cela, nous interdisons formellement de construire des formulaires complexes avec validation directement à l'intérieur des fichiers composants. 

Nous utilisons **React Hook Form** avec **Zod** pour la validation typée.

## 1. Philosophie : Externalisation de la Logique de Saisie
Un formulaire est une entité logique à part entière. Il possède son schéma de validation, ses valeurs par défaut et ses règles de validation croisées.
Toute cette logique doit être extraite dans un fichier dédié sous le dossier `presentation/forms/`.

## 2. Règle de Création (Le Schéma Zod)
Lorsqu'un composant nécessite un formulaire :
1.  **Crée un fichier `.schema.ts` :** (ex: `invoice.schema.ts`).
2.  **Définis le schéma Zod :** Crée un schéma de validation typé avec Zod.
3.  **Exporte le type inféré :** Utilise `z.infer<typeof schema>` pour le typage.
4.  **Encapsule la validation :** Le schéma Zod contient toutes les règles de validation (synchrones et asynchrones via `.refine()`).

## 3. Exemple Attendu (Le Schéma de Formulaire)

```typescript
// src/modules/billing/presentation/forms/invoice.schema.ts
import { z } from 'zod';

// 1. Définition du schéma de validation
export const invoiceFormSchema = z.object({
  clientId: z.string().min(1, 'Le client est requis'),
  amountTTC: z.number().min(1, 'Le montant doit être supérieur à 0'),
  dueDate: z.string().min(1, 'La date d\'échéance est requise')
});

// 2. Type inféré du formulaire
export type InvoiceFormData = z.infer<typeof invoiceFormSchema>;

// 3. Valeurs par défaut (optionnel)
export const invoiceFormDefaults: Partial<InvoiceFormData> = {
  clientId: '',
  amountTTC: 0,
  dueDate: ''
};
```

## 4. Intégration dans le Composant (Génération de la Vue)

Le composant React devient un simple passe-plat. Il utilise `useForm` avec le schéma Zod via `zodResolver` et lie le formulaire au template.

```typescript
// src/modules/billing/presentation/components/AddInvoiceForm.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { invoiceFormSchema, type InvoiceFormData, invoiceFormDefaults } from '../forms/invoice.schema';
import { useCreateInvoice } from '../hooks/use-create-invoice';

export function AddInvoiceForm() {
  const { createInvoice } = useCreateInvoice();
  
  // Instanciation du formulaire avec le schéma Zod
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<InvoiceFormData>({
    resolver: zodResolver(invoiceFormSchema),
    defaultValues: invoiceFormDefaults
  });

  const onSubmit = async (data: InvoiceFormData) => {
    // Le composant délègue la donnée validée au hook
    await createInvoice(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input {...register('clientId')} />
        {errors.clientId && <span>{errors.clientId.message}</span>}
      </div>

      <div>
        <input type="number" {...register('amountTTC', { valueAsNumber: true })} />
        {errors.amountTTC && <span>{errors.amountTTC.message}</span>}
      </div>

      <div>
        <input type="date" {...register('dueDate')} />
        {errors.dueDate && <span>{errors.dueDate.message}</span>}
      </div>

      <button type="submit" disabled={isSubmitting}>
        Créer la facture
      </button>
    </form>
  );
}
```

## 5. Validations Croisées et Logique Avancée

Pour les validations complexes (champs dépendants, validation asynchrone), utilise `.refine()` ou `.superRefine()` dans le schéma Zod :

```typescript
export const invoiceFormSchema = z.object({
  amountTTC: z.number().min(1),
  discount: z.number().min(0).max(100)
}).refine(data => {
  const finalAmount = data.amountTTC * (1 - data.discount / 100);
  return finalAmount > 0;
}, {
  message: 'Le montant final doit être supérieur à 0',
  path: ['amountTTC']
});
```

## 6. Flux de Génération (Trigger)

Si je te demande "Crée le formulaire pour la création d'utilisateur" :

1.  **Logique Formulaire :** Tu génères d'abord `user.schema.ts` contenant le schéma Zod avec toutes les validations pertinentes et le type inféré.
2.  **Logique Composant :** Tu génères `UserForm.tsx` qui utilise `useForm` avec `zodResolver` et le schéma.
3.  **Template :** Tu génères le JSX en utilisant `{...register('fieldName')}` et en affichant les erreurs via `errors.fieldName?.message`.