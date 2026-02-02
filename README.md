# chat_bot_IA

backend/
├── app/
│   ├── main.py
│   ├── core/
│   │   ├── config.py        # env, secrets
│   │   ├── security.py      # bcrypt + JWT
│   │   └── deps.py          # dépendances auth
│   │
│   ├── db/
│   │   ├── database.py      # TinyDB init
│   │   ├── users.py         # users CRUD
│   │   └── history.py       # IA history
│   │
│   ├── auth/
│   │   ├── routes.py        # login / register
│   │   └── schemas.py       # Pydantic auth
│   │
│   ├── routes/
│   │   ├── user.py          # /me
│   │   ├── ai.py            # /ask-ai
│   │   └── history.py       # /history
│   │
│   └── models/
│       └── token.py         # token data model
│
├── .env
├── requirements.txt
└── uvicorn_run.sh


frontend/
├── src/
│   ├── api/
│   │   └── client.js        # axios / fetch
│   │
│   ├── auth/
│   │   ├── AuthContext.jsx
│   │   └── ProtectedRoute.jsx
│   │
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── Dashboard.jsx
│   │
│   ├── components/
│   │   └── Navbar.jsx
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
└── .env


Poser une structure propre backend / frontend

Implémenter l’authentification backend en premier

Sécuriser les routes avec JWT

Brancher l’IA uniquement côté backend

Connecter le frontend

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

