from flask_wtf import FlaskForm
from wtforms import PasswordField, StringField
from wtforms.validators import InputRequired, Length


class LoginForm(FlaskForm):
    username = StringField(
        "Username", validators=[InputRequired(), Length(max=32)]
    )
    password = PasswordField(
        "Password", [InputRequired(), Length(min=8, max=32)]
    )


class SignupForm(FlaskForm):
    username = StringField(
        "Username", validators=[InputRequired(), Length(max=32)]
    )
    password = PasswordField(
        "Password", [InputRequired(), Length(min=8, max=32)]
    )
