from fastapi import APIRouter, HTTPException, status
from uuid import uuid4

from app.auth.schemas import UserCreate, Token
from app.db.users import get_user_by_email, create_user
from app.core.security import hash_password, verify_password, create_access_token


router = APIRouter(prefix="/auth",tags=["auth"])

@router.post("/register")
def register(user: UserCreate):

    # Vérifier si l'user existe déjà
    if get_user_by_email(user.email):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User already exists")
    
    # Créer l'user
    new_user = {
        "id":str(uuid4()),                  # génération ID unique
        "email": user.email,
        "password_hash": hash_password(user.password)       # hash le mot de passe
    }
    
    # Sauvegarder en base
    create_user(new_user)

    return {"message":"User created successfully"}


@router.post("/login",response_model=Token)
def login(user: UserCreate):
    db_user = get_user_by_email(user.email)
    
    if not db_user or not verify_password(user.password,db_user["password_hash"]):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    token = create_access_token({"sub": db_user["id"]})
    
    return {"access_token":token}


