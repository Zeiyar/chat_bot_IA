from fastapi import APIRouter, Depends, HTTPException
from datetime import datetime, timezone
import uuid

from app.core.deps import get_current_user
from app.db.chats import get_chat_by_id
from app.db.messages import add_message, get_chat_messages

router = APIRouter(prefix="/chats/{chat_id}/messages", tags=["messages"])


@router.get("")
def list_messages(chat_id: str, user_id: str = Depends(get_current_user)):
    chat = get_chat_by_id(chat_id)

    if not chat or chat["user_id"] != user_id:
        raise HTTPException(status_code=404, detail="Chat not found")

    messages = get_chat_messages(chat_id)

    messages.sort(
        key=lambda m: m["created_at"]
    )

    return messages


@router.post("")
def post_message(
    chat_id: str,
    payload: dict,
    user_id: str = Depends(get_current_user)
):
    chat = get_chat_by_id(chat_id)

    if not chat or chat["user_id"] != user_id:
        raise HTTPException(status_code=404, detail="Chat not found")

    content = payload.get("content")

    if not content:
        raise HTTPException(status_code=400, detail="Message content required")

    message = {
        "id": str(uuid.uuid4()),
        "chat_id": chat_id,
        "role": "user",
        "content": content,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }

    add_message(message)
    return message
