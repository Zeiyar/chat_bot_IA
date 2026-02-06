from fastapi import APIRouter, Depends, HTTPException
from datetime import datetime, timezone
import uuid

from app.core.deps import get_current_user
from app.db.messages import add_message
from app.auth.schemas import AskAIRequest, AskAIResponse
from app.core.groq_client import client
from app.db.chats import get_chat_by_id
from app.db.messages import get_chat_messages
from app.db.database import chats_table

router = APIRouter(prefix="/ask-ai", tags=["ai"])

@router.post("/{chat_id}", response_model=AskAIResponse)
def ask_ai(
    payload: AskAIRequest,
    chat_id: str,
    user_id: str = Depends(get_current_user),
):
    
    chat = get_chat_by_id(chat_id)
    if not chat or chat["user_id"] != user_id:
        raise HTTPException(status_code=404, detail="Chat not found")
    
    prompt = payload.prompt
    if not prompt:
        raise HTTPException(status_code=400, detail="Prompt empty")
    
    user_message = {
        "id": str(uuid.uuid4()),
        "chat_id": chat_id,
        "role": "user",
        "content": prompt,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    add_message(user_message)
    
    messages = get_chat_messages(chat_id)
    messages.sort(key=lambda m: m["created_at"])
    
    llm_messages = [
        {
            "role": m["role"],
            "content": m["content"]
        }
        for m in messages
    ]
    llm_messages.append({
        "role":"user",
        "content": prompt,
    })

    try:
        chat_completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=llm_messages,
        )
        ai_text = chat_completion.choices[0].message.content
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    # Sauvegarde historique
    ai_message = {
        "id": str(uuid.uuid4()),
        "chat_id": chat_id,
        "role": "assistant",
        "content": ai_text,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    add_message(ai_message)
    
    if chat["title"] == "New chat":
        title = prompt[:40]
        chats_table.update(
            {"title": title},
            lambda c: c["id"] == chat_id
    )

    return {"response": ai_text}