import datetime

from flask_login import UserMixin
from flask_sqlalchemy import SQLAlchemy
from marshmallow import Schema, fields, post_load

db = SQLAlchemy()


# Models
class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(32), unique=True, nullable=False)
    password_salt = db.Column(db.LargeBinary(32), nullable=False)
    password_hash = db.Column(db.LargeBinary(64), nullable=False)
    date_created = db.Column(db.DateTime, default=datetime.datetime.now)
    todos = db.relationship("Todo", backref="user")


class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    contents = db.Column(db.String(512))
    completed = db.Column(db.Boolean, nullable=False, default=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))


# Schemas
class BaseSchema(Schema):
    __model__ = None

    @post_load
    def make_model(self, data, **kwargs):
        # pylint: disable=not-callable
        # pylint: disable=unused-argument

        return self.__model__(**data) if self.__model__ is not None else None


class TodoSchema(BaseSchema):
    __model__ = Todo
    id = fields.Integer()
    title = fields.Str()
    contents = fields.Str()
    completed = fields.Bool()
    user_id = fields.Integer()
