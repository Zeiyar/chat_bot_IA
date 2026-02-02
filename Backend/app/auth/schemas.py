from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    email: EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

# c'est une étape de validation des données avant de les traiter
# empeche les données mal formées, FastAPI renvoie des erreurs claires