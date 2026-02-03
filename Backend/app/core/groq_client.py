from groq import Groq
from app.core.config import settings

client = Groq(
    api_key=settings.OPENROUTER_API_KEY
)