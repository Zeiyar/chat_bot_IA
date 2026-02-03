from fastapi import FastAPI
from app.auth.routes import router as auth_router
from app.routes.user import router as user_router
from app.routes.history import router as history_router
from app.routes.ai import router as ai_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite
    allow_credentials=True,                   # 🔑 cookies
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ai_router)
app.include_router(history_router)
app.include_router(auth_router)
app.include_router(user_router)