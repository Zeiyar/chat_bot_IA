from fastapi import APIRouter, Depends, HTTPException
from app.core.deps import get_current_user
from app.db.users import get_user_by_id

router = APIRouter(prefix="/users", tags=["users"])

@router.get("/me")
def read_me(user_id: str = Depends(get_current_user)):
    user = get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return {
        "id": user["id"],
        "email": user["email"]
    }

#Cette route utilise une dépendance FastAPI pour vérifier le token JWT et récupérer l’utilisateur 
#courant avant d’exécuter la logique métier.