from datetime import datetime, timedelta, timezone
from passlib.context import CryptContext
from jose import jwt, JWTError
from app.core.config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto") #algorythme de hash => bcrypt 

def hash_password(password:str) -> str:
    return pwd_context.hash(password)

def verify_password(password:str,hashed:str) -> bool:
    return pwd_context.verify(password,hashed)

# Création de la clé JWT à partir des données utilisateurs (id,email,password haché)
def create_access_token(data:dict):
    try:
        to_encode = data.copy()
        expire = datetime.now(timezone.utc) + timedelta(
            minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
        )
        to_encode.update({"exp": expire})

        token = jwt.encode(
            to_encode,
            settings.SECRET_KEY,
            algorithm=settings.ALGORITHM
        )

        return token

    except JWTError as e:
        raise ValueError("Erreur lors de la création du JWT") from e