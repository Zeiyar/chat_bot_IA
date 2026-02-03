from fastapi import APIRouter, Depends, HTTPException
from datetime import datetime, timezone
import uuid

from app.core.deps import get_current_user
from app.db.history import add_history
from app.auth.schemas import AskAIRequest, AskAIResponse
from app.core.groq_client import client

router = APIRouter(prefix="/ask-ai", tags=["ai"])

@router.post("", response_model=AskAIResponse)
def ask_ai(
    payload: AskAIRequest,
    user_id: str = Depends(get_current_user),
):
    prompt = payload.prompt

    try:
        chat_completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
        )

        ai_text = chat_completion.choices[0].message.content

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    # Sauvegarde historique
    add_history({
        "id": str(uuid.uuid4()),
        "user_id": user_id,
        "prompt": prompt,
        "response": ai_text,
        "created_at": datetime.now(timezone.utc).isoformat(),
    })

    return {"response": ai_text}
