from fastapi import APIRouter, Depends
from app.core.deps import get_current_user
from app.db.history import get_user_history

router = APIRouter(prefix="/history", tags=["history"])

@router.get("")
def read_history(user_id: str = Depends(get_current_user)):
    return get_user_history(user_id)
