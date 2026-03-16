from fastapi import APIRouter, Depends, HTTPException
from datetime import datetime, timezone
import uuid

from app.core.deps import get_current_user
from app.db.chats import create_chat, get_user_chats, get_chat_by_id, delete_chat_db
from app.db.messages import delete_messages

router = APIRouter(prefix="/chats", tags=["chats"])


@router.post("")
def create_new_chat(user_id: str = Depends(get_current_user)):
    chat = {
        "id": str(uuid.uuid4()),
        "user_id": user_id,
        "title": "New chat",
        "created_at": datetime.now(timezone.utc).isoformat(),
    }

    create_chat(chat)
    return chat


@router.get("")
def list_my_chats(user_id: str = Depends(get_current_user)):
    chats = get_user_chats(user_id)

    chats.sort(
        key=lambda c: datetime.fromisoformat(c["created_at"]),
        reverse=True  # plus récents d'abord
    )

    return chats


@router.get("/{chat_id}")
def get_chat(chat_id: str, user_id: str = Depends(get_current_user)):
    chat = get_chat_by_id(chat_id)

    if not chat or chat["user_id"] != user_id:
        raise HTTPException(status_code=404, detail="Chat not found")

    return chat

@router.delete("/{chat_id}")
def delete_chat(chat_id: str, user_id: str = Depends(get_current_user)):
    chat = get_chat_by_id(chat_id)
    if not chat or chat["user_id"] != user_id:
        raise HTTPException(status_code=404)

    delete_chat_db(chat_id)
    delete_messages(chat_id)

    return {"status": "deleted"}
