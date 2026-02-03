from fastapi import Depends, APIRouter, HTTPException, status
from uuid import uuid4

from app.auth.schemas import UserCreate, Token
from app.db.users import get_user_by_email, create_user
from app.core.security import hash_password, verify_password, create_access_token
from app.core.deps import get_current_user


router = APIRouter(prefix="/auth",tags=["auth"])

@router.post("/register")
def register(user: UserCreate):
    
    # Vérifier si le mdp est trop long:
    if len(user.password) > 72:
        raise HTTPException(status_code=400,detail="Mot de passe trop long (max 72 caractères)")

    # Vérifier si l'user existe déjà
    if get_user_by_email(user.email):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User already exists")
    
    password = hash_password(user.password)
    # Créer l'user
    new_user = {
        "id":str(uuid4()),                  # génération ID unique
        "email": user.email,
        "password_hash": password       # hash le mot de passe & jamais stocké en clair = sécurisé
    }
    
    # Sauvegarder en base
    create_user(new_user)

    return {"message":"User created successfully"}



# Le front envoie email + mdp, on le récupere ici l'user et compare le hash, si ok créer un JWT
@router.post("/login",response_model=Token)
def login(user: UserCreate):

    # Récupérer l'user
    db_user = get_user_by_email(user.email)
    
    # Vérification de l'user et du mot de passe
    if not db_user or not verify_password(user.password,db_user["password_hash"]):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    # Création du token (JWT)
    token_data = {
        "sub": db_user["id"],
        "email": db_user["email"]
    }

    token = create_access_token(token_data)
    
    return {"access_token":token, "token_type": "bearer"}
# puis le front reçoit le token et le mdp n'est plus utilisé


# Une route protégée vérifie la présence et la validité du token JWT avant d’autoriser l’accès.
@router.get("/protected")
def protected_route(user_id: str = Depends(get_current_user)):
    return {
        "message": "Accès autorisé",
        "user_id": user_id
    }
