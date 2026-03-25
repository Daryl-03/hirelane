# CV Module

## Rôle
Gère l'upload, extraction et stockage des CV utilisateurs.

## Contenu Clé
- **Entités:** CV entity avec extractedData JSON
- **Use Cases:**
  - UploadCVUseCase (extraction PDF vers JSON)
  - UpdateCVUseCase (modification manuelle des données)
- **Composants:** 
  - CVUploadForm
  - CVEditForm 
  - CVPreview
- **Infrastructure:** CVRepository (Prisma), PDF extraction service

## Contraintes
- Données extraites stockées en JSON structuré
- Support PDF uniquement pour l'upload initial