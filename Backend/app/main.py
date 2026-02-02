from fastapi import FastAPI
from app.auth.routes import router as auth_router
from app.routes.user import router as user_router

app = FastAPI()

app.include_router(auth_router)
app.include_router(user_router)