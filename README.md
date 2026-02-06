# Application Fullstack d'Assistant IA
## Corentin Mariey et Jean-Baptiste Lizé

## Présentation

Ce projet est une application **fullstack** permettant à un utilisateur authentifié d’interagir avec un assistant IA via une interface web moderne.  
L’application repose sur une architecture **Frontend / Backend** avec gestion sécurisée de l’authentification et des routes avec un JWT (JSON Web Token), stockage des conversations et intégration d’un LLM externe.


## Installation & Setup

Avant de lancer le projet, assurez-vous d’avoir installé les éléments suivants :

1. Python

    Version recommandée : Python 3.11 ou supérieur

    Vérifier l’installation (terminal) :   `python --version`

2. Node.js & npm

    Nécessaire pour le frontend React. Version recommandée : Node 18+

    Vérifier l’installation : 
    `node --version`
    `npm --version`


3. Git

    Pour cloner le repository depuis Git Hub:    `git --version`


### Cloner le projet

``git clone https://github.com/TON_USERNAME/TON_REPO.git``
``cd TON_REPO``

On dois avoir une structure attendue qui est la suivante:
``Backend/``
``Frontend/``
``README.md``


### Backend (FastAPI/Python) – Installation & Lancement

🔹 1. On se place dans le backend.
``cd Backend``

🔹 2. On Créer un environnement virtuel (venv) sur Windows 11.
``python -m venv venv``

🔹 3. On active notre environnement nouvellement crée.
``venv\Scripts\activate``

➡️ Le terminal doit afficher (venv) devant le chemin de notre entrée de commandes.

🔹 4. Installer les dépendances backend (les requirements)
``pip install --upgrade pip``
``pip install -r requirements.txt``

🔹 5. *.env* à initialiser
.env : S'occupe de la sécurité et des configurations avant la création des routes, tant que ce n'est pas prêt, on ne code aucune routes

Il faut créer ce fichier et y ajouter les configurations suivantes: ``touch .env``

``SECRET_KEY=super-secret-key``
``ALGORITHM=HS256``
``ACCESS_TOKEN_EXPIRE_MINUTES=1440``
``OPENROUTER_API_KEY=""``

On prépart ainsi les clés secrètes, le JWT et le bcrypt pour hacher (crypter) le mot de passe user
Le .env ne sera pas envoyé sur github comme il est mis dnas le .gitignore

🔹 6. Lancer le serveur uvicorn backend
``uvicorn app.main:app --reload``

➡️ Backend disponible sur : http://127.0.0.1:8000

On peut ajouter à notre url /docs pour avoir http://127.0.0.1:8000/docs qui nous permet d'avoir une UI 
avec la documentation Swagger issu de FastAPI, afin de nous donner un interface de nos endpoints et de
les tester pour vérifier le bon fonctionnement de notre backend.


### Frontend (React - Vite) – Installation & Lancement

On garde le server backend allumé, donc pouir travailler sur le fronted, on ouvre un nouveau terminal.

🔹 1. Se placer dans le frontend: ``cd ../frontend``

🔹 2. Installer la dépendances:  ``npm install``

🔹 3. Lancer l’application React: ``npm run dev``

➡️ Frontend disponible sur : http://localhost:5173


## Fonctionnement de l’authentification

L’authentification repose sur un mécanisme JWT sécurisé via cookies HTTP-only, garantissant à la fois sécurité et simplicité côté frontend.

🔹 Parcours utilisateur

1. Inscription via l’endpoint /register
2. Connexion via l'endpoint /login
3. Le backend génère un JWT signé et un mot de passe hashé
4. Le token est stocké dans un cookie HTTP-only
5. Le frontend n’accède jamais directement au token (protection XSS)
6. Les routes protégées utilisent ce token pour identifier l’utilisateur

🔹 Avantages de cette approche

1. Pas de stockage du token dans localStorage
2. Protection contre les attaques XSS
3. Gestion automatique de la session via le navigateur


## Fonctionnalité IA (Chat intelligent)

L’application propose une fonctionnalité de chat conversationnel avec une IA externe, intégrée de manière sécurisée et persistante.

🔹 Cycle complet d’un message IA

1. L’utilisateur saisit un prompt dans l’interface React
2. Le prompt est envoyé au backend via une requête HTTP sécurisée
3. Le backend :
    . identifie l’utilisateur via le cookie JWT
    . appelle un LLM externe via Groq, ici ``llama-3.3-70b-versatile``
4. La réponse de l’IA est retournée sur le frontend
5. Le prompt et la réponse sont sauvegardés côté backend dans un historique
6. L’interface affiche la réponse en temps réel

🔹 Persistance & mémoire

1. Chaque utilisateur dispose de son historique de conversations
2. Les messages sont sauvegardés dans TinyDB (JSON)
3. Les conversations sont conservées après un rafraîchissement de page et la fermeture du navigateur


## Endpoints principaux

| Méthode | Route                    | Description                                               |
| ------- | ------------------------ | --------------------------------------------------------- |
| POST    | `/auth/register`         | Création d’un compte utilisateur                          |
| POST    | `/auth/login`            | Connexion et génération du JWT                            |
| POST    | `/auth/logout`           | Déconnexion d’un utilisateur                              |
| POST    | `/routes/ask-ai`         | Envoi d’un prompt à l’IA                                  |
| POST    | `/routes/chats`          | Créer une nouvelle conversation                           |
| GET     | `/routes/chats`          | Lister les conversations de l'utilisateur                 |
| GET     | `/routes/chats/{chat_id}`| Créer une nouvelle conversation                           |
| DELETE  | `/routes/chats/{chat_id}`| Supprimer une conversations                               |
| GET     | `/messages/{chat_id}`    | Récupération les messages d'un chat                       |
| POST    | `/messages/{chat_id}`    | Ecrir un messages d'un chat                               |
| GET     | `/routes/me`             | Récupérer infos de l'utilisateur actuellement authentifié |



## Dépannage courant
❌ Erreur bcrypt / mot de passe trop long
    . Les mots de passe sont limités à 72 bytes
    . Vérifiez la longueur côté backend

❌ Erreur 401 Unauthorized
    . Vérifiez que vous êtes connecté
    . Vérifiez la présence du cookie access_token




