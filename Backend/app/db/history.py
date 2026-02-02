from app.db.database import history_table

def add_history(entry: dict):
    history_table.insert(entry)

def get_user_history(user_id: str):
    return history_table.search(lambda x: x["user_id"] == user_id)
