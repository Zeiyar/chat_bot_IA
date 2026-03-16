from pydantic import BaseModel, EmailStr, Field

class UserCreate(BaseModel):
    email: EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class AskAIRequest(BaseModel):
    prompt: str
    
class AskAIResponse(BaseModel):
    response: str
    
class PostMessageAi(BaseModel):
    content: str = Field(min_length=1, max_length=2000)
    

    
    
# c'est une étape de validation des données avant de les traiter
# empeche les données mal formées, FastAPI renvoie des erreurs claires