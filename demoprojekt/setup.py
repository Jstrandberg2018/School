import sqlite3
import bcrypt
 
# Namn, lösenord, är admin (1/0)
users = [("admin1", "adminpass", 1),
         ("user1", "userpass", 0),
         ("user2", "123456", 0)]
 
 
def hash_password(plain_text_password):
    return bcrypt.hashpw(plain_text_password.encode("utf-8"), bcrypt.gensalt())
 
 
conn = sqlite3.connect("users.db")
cursor = conn.cursor()
 
cursor.execute("DROP TABLE IF EXISTS users")
 
cursor.execute("""
    CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        password TEXT NOT NULL,
        admin INTEGER NOT NULL DEFAULT 0
    )
""")
 
for name, password, admin in users:
    hashed_pw = hash_password(password)
    cursor.execute(
        "INSERT INTO users (username, password, admin) VALUES (?, ?, ?)",
        (name, hashed_pw, admin),
    )
 
conn.commit()
conn.close()
 
print("Databasen har skapats!")