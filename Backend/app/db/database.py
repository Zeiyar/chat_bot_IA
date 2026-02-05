from tinydb import TinyDB

db = TinyDB("db.json")

#  fichier JSOn et 2 tables logiques (user et historique chat)
users_table = db.table("users")
chats_table = db.table("chats")
message_table = db.table("message")
