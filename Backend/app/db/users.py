from tinydb import Query
from app.db.database import users_table

User = Query()

def get_user_by_id(id: int):
    return users_table.get(User.id == id)

def get_user_by_email(email: str):
    return users_table.get(User.email == email)

def create_user(user: dict):
    users_table.insert(user)