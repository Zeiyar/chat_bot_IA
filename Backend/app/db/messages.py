from app.db.database import message_table

def add_message(entry: dict):
    message_table.insert(entry)

def get_chat_messages(chat_id: str):
    results = message_table.search(lambda x: x["chat_id"] == chat_id)
    return sorted(
        results,
        key=lambda x: x["created_at"]
    )