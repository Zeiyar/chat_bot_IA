# protéger les routes
# user peut appeller les routes 
# le backend sait qui fait l appel

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError
from app.core.config import settings

security = HTTPBearer()   #tokenUrl route de login utile pour Swagger

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
):
    token = credentials.credentials
    try:
        # vérification de la validité de la signature et l'expiration du token, décode le contenu
        payload = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=[settings.ALGORITHM]
        )
        user_id : str = payload.get("sub")          #Récupération de l'id usuer
        
        if user_id is None:
            raise HTTPException(status_code=401, detail="Token invalide")

        return user_id

    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token"
        )
