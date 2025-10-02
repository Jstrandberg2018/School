from flask import Flask, render_template, request, redirect, url_for, session, flash
import sqlite3
import bcrypt
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField, SubmitField
from wtforms.validators import DataRequired
from flask_wtf.csrf import CSRFProtect
 
DATABASE = "users.db"
CSRF_KEY = "my_super_secret_key"
 
app = Flask(__name__)
app.secret_key = CSRF_KEY
csrf = CSRFProtect(app)
 
 
class LoginForm(FlaskForm):
    username = StringField("Användarnamn", validators=[DataRequired()])
    password = PasswordField("Lösenord", validators=[DataRequired()])
    submit = SubmitField("Logga in")
 
 
class UserForm(FlaskForm):
    username = StringField("Användarnamn", validators=[DataRequired()])
    password = PasswordField("Lösenord", validators=[DataRequired()])
    admin = BooleanField("Admin")
    submit = SubmitField("Spara")
 
 
def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn
 
 
def hash_password(plain_text_password):
    return bcrypt.hashpw(plain_text_password.encode("utf-8"), bcrypt.gensalt())
 
 
@app.route("/", methods=["GET", "POST"])
def login():
    if session.get("username"):
        return redirect(url_for("index"))
    form = LoginForm()
    if form.validate_on_submit():
        username = form.username.data or ""
        password = form.password.data or ""
 
        conn = get_db_connection()
        user = conn.execute(
            "SELECT * FROM users WHERE username = ?", (username,)
        ).fetchone()
        conn.close()
 
        if user and bcrypt.checkpw(password.encode("utf-8"), user["password"]):
            session["userid"] = user["id"]
            session["username"] = user["username"]
            session["admin"] = bool(user["admin"])
            if session["admin"]:
                return redirect(url_for("index"))
            else:
                return redirect(url_for("profile"))
        flash("Fel användarnamn eller lösenord.")
    return render_template("login.html", form=form)
 
 
@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("login"))
 
 
@app.route("/profile")
def profile():
    if not session.get("username"):
        return redirect(url_for("login"))
    id = session.get("userid")
    conn = get_db_connection()
    user = conn.execute("SELECT * FROM users WHERE id = ?", (id,)).fetchone()
    conn.close()
    if not user:
        return redirect(url_for("login"))
    return render_template("profile.html", user=user)
 
 
@app.route("/view")
def index():
    if not session.get("username") or not session.get("admin"):
        return redirect(url_for("profile"))
    conn = get_db_connection()
    users = conn.execute("SELECT * FROM users").fetchall()
    conn.close()
    return render_template("index.html", users=users)
 
 
@app.route("/add", methods=["GET", "POST"])
def add_user():
    if not session.get("admin"):
        return redirect(url_for("profile"))
    form = UserForm()
    if form.validate_on_submit():
        username = form.username.data
        password = hash_password(form.password.data or "")
        admin = 1 if form.admin.data else 0
 
        conn = get_db_connection()
        conn.execute(
            "INSERT INTO users (username, password, admin) VALUES (?, ?, ?)",
            (username, password, admin),
        )
        conn.commit()
        conn.close()
        return redirect(url_for("index"))
    return render_template("add_user.html", form=form)
 
 
@app.route("/edit/<int:id>", methods=["GET", "POST"])
def edit_user(id):
    if not session.get("admin"):
        return redirect(url_for("profile"))
    conn = get_db_connection()
    user = conn.execute("SELECT * FROM users WHERE id = ?", (id,)).fetchone()
 
    form = UserForm()
    if request.method == "GET":
        form.username.data = user["username"]
        form.admin.data = bool(user["admin"])
 
    if form.validate_on_submit():
        username = form.username.data
        admin = 1 if form.admin.data else 0
        if form.password.data:
            password = hash_password(form.password.data or "")
            conn.execute(
                "UPDATE users SET username = ?, password = ?, admin = ? WHERE id = ?",
                (username, password, admin, id),
            )
        else:
            conn.execute(
                "UPDATE users SET username = ?, admin = ? WHERE id = ?",
                (username, admin, id),
            )
        conn.commit()
        conn.close()
        return redirect(url_for("index"))
    return render_template("edit_user.html", form=form)
 
 
@app.route("/delete/<int:id>")
def delete_user(id):
    if not session.get("admin"):
        return redirect(url_for("profile"))
 
    conn = get_db_connection()
    conn.execute("DELETE FROM users WHERE id = ?", (id,))
    conn.commit()
    conn.close()
    return redirect(url_for("index"))
 
 
if __name__ == "__main__":
    app.run(debug=True)