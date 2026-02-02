# BaseSettings est une classe spécifique à Pydantic qui lit automatiquement les variables environnement
# valide leur types et évite les erreurs de config
from pydantic import BaseSettings

# Chaque ligne correspond à une variable dans .env
class Settings(BaseSettings):
    SECRET_KEY=str
    ALGORITHM=str
    ACCESS_TOKEN_EXPIRE_MINUTES=int
    
    class Config:
        env_file =".env"


settings = Settings()