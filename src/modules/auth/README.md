# Auth Module

## Rôle
Gère l'authentification des utilisateurs (inscription, connexion, logout, gestion des sessions).

## Contenu Clé
- **Entités:** User entity avec validation email/password
- **Use Cases:** 
  - SignupUseCase (inscription avec hachage bcrypt)
  - LoginUseCase (validation credentials + JWT)
  - LogoutUseCase
- **Pages/Composants:** 
  - SignupForm (/auth/signup)
  - LoginForm (/auth/login)
- **Infrastructure:** UserRepository (Prisma), JWT token management

## Contraintes
- Mots de passe hachés avec bcrypt
- JWT tokens stockés dans httpOnly cookies
- Validation stricte des emails et passwords