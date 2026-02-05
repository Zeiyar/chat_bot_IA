from app.db.database import history_table

# Ajoute entrée dans la table history, entry est un dictionnaire
def add_history(entry: dict):
    history_table.insert(entry)

# récupère toutes les conversations d'un user et filtre sur le champs user_id
def get_user_history(user_id: str):
    results = history_table.search(lambda x: x["user_id"] == user_id)
    return sorted(
        results, 
        key=lambda x: x["created_at"],
        reverse=True
        )


# Ca range dans l'ordre de création des historiques de message