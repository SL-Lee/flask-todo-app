import hashlib
import os

from flask import Flask, flash, redirect, render_template, request, url_for
from flask_login import (
    LoginManager,
    current_user,
    login_required,
    login_user,
    logout_user,
)
from flask_wtf.csrf import CSRFProtect

from blueprints import api_blueprint, todo_app_blueprint
from forms import LoginForm, SignupForm
from models import User, db

app = Flask(__name__)
app.config.update(
    SECRET_KEY=os.urandom(32),
    SQLALCHEMY_TRACK_MODIFICATIONS=False,
    SQLALCHEMY_DATABASE_URI="sqlite:///db.sqlite3",
    SESSION_COOKIE_SAMESITE="Lax",
)

app.register_blueprint(api_blueprint.api_blueprint)
app.register_blueprint(todo_app_blueprint.todo_app_blueprint)

csrf = CSRFProtect(app)
csrf.exempt(api_blueprint.api_blueprint)

login_manager = LoginManager(app)
login_manager.login_view = "login"
login_manager.login_message_category = "danger"

db.init_app(app)

with app.app_context():
    db.create_all()
    db.session.commit()


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


@app.route("/")
def index():
    if current_user.is_authenticated:
        return redirect(url_for("todo_app.todo_app"))

    return render_template("index.html")


@app.route("/login", methods=["GET", "POST"])
def login():
    if current_user.is_authenticated:
        return redirect(url_for("index"))

    login_form = LoginForm(request.form)

    if request.method == "POST" and login_form.validate():
        user = User.query.filter_by(username=login_form.username.data).first()

        if user is None:
            flash("Username and/or password is incorrect.", "danger")
            return redirect(url_for("login"))

        if (
            hashlib.scrypt(
                password=login_form.password.data.encode("UTF-8"),
                salt=user.password_salt,
                n=32768,
                r=8,
                p=1,
                maxmem=33816576,
            )
            == user.password_hash
        ):
            login_user(user)
            flash("Logged in successfully.", "success")
            return redirect(url_for("todo_app.todo_app"))

        flash("Username and/or password is incorrect.", "danger")

    return render_template("login.html", form=login_form)


@app.route("/signup", methods=["GET", "POST"])
def signup():
    if current_user.is_authenticated:
        return redirect(url_for("todo_app.todo_app"))

    signup_form = SignupForm(request.form)

    if request.method == "POST" and signup_form.validate():
        if (
            User.query.filter_by(username=signup_form.username.data).first()
            is not None
        ):
            flash(
                "An account with this username already exists. Please try "
                "again with a different username.",
                "danger",
            )
            return redirect(url_for("signup"))

        new_user_password_salt = os.urandom(32)
        new_user_password_hash = hashlib.scrypt(
            password=signup_form.password.data.encode("UTF-8"),
            salt=new_user_password_salt,
            n=32768,
            r=8,
            p=1,
            maxmem=33816576,
        )
        new_user = User(
            username=signup_form.username.data,
            password_salt=new_user_password_salt,
            password_hash=new_user_password_hash,
        )
        db.session.add(new_user)
        db.session.commit()
        login_user(new_user)
        flash("Account created successfully.", "success")
        return redirect(url_for("todo_app.todo_app"))

    return render_template("signup.html", form=signup_form)


@app.route("/logout", methods=["POST"])
@login_required
def logout():
    logout_user()
    return redirect(url_for("index"))


if __name__ == "__main__":
    app.run(debug=True)
