from datetime import datetime, timezone
from app.db.database import chats_table

def create_chat(chat: dict):
    chats_table.insert(chat)

def get_user_chats(user_id: str):
    return chats_table.search(lambda c: c["user_id"] == user_id)

def get_chat_by_id(chat_id: str):
    result = chats_table.search(lambda c: c["id"] == chat_id)
    return result[0] if result else None