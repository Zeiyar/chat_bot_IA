from tinydb import TinyDB

db = TinyDB("db.json")

#  fichier JSOn et 2 tables logiques (user et historique chat)
users_table = db.table("users")
history_table = db.table("history")