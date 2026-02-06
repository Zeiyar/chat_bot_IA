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

🔹 5. Lancer le serveur uvicorn backend
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

Inscription via /register
Connexion via /login

Un JWT est généré côté backend

Le token est stocké dans un cookie HTTP-only

Toutes les routes protégées utilisent ce token pour identifier l’utilisateur

🤖 Fonctionnalité IA

Les prompts sont envoyés au backend

Le backend appelle le LLM (OpenRouter / Groq)

L’historique est sauvegardé par utilisateur

Chaque utilisateur possède une mémoire conversationnelle limitée

🧪 Endpoints principaux
Méthode	Route	Description
POST	/auth/register	Créer un compte
POST	/auth/login	Connexion
GET	/auth/protected	Route protégée
POST	/ask-ai	Envoyer un prompt IA
GET	/history	Historique utilisateur
🛠️ Dépannage courant
❌ Erreur bcrypt / mot de passe trop long

Les mots de passe sont limités à 72 bytes

Vérifiez la longueur côté backend

❌ Erreur 401 Unauthorized

Vérifiez que vous êtes connecté

Vérifiez la présence du cookie access_token

🧠 Notes techniques

Backend : FastAPI + TinyDB

Frontend : React + Vite

Auth : JWT + Cookies

IA : LLM via API externe

Architecture orientée sécurité & séparation des responsabilités



l utilisateur se connecter
=> parle => frontend input => script 
=> l ia répond => openrouter
=> stocke les réponse et le prompt de base dans un json  => tiny_db
=> on garde les chat même si on referme le navigateur => cookies


## .env
.env : S'occupe de la sécurité et des configurations avant la création des routes, tant que ce n'est pas prêt, on ne code aucune routes

SECRET_KEY=super-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60

On prépart ainsi les clés secrètes, le JWT et le bcrypt pour hacher (crypter) le mot de passe user
Le .env ne sera pas envoyé sur github 
