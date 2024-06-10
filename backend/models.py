from sqlalchemy import inspect
from __init__ import db


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False, unique=True, autoincrement=True)
    email = db.Column(db.String(100), nullable=False, unique=True)
    password = db.Column(db.String(100), nullable=False)
    jwt = db.Column(db.String(500))
    org_code = db.Column(db.String(10), nullable=True)

    def toDict(self):
        return {c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs}

    def __repr__(self):
        return "<%r>" % self.email


class ImageUpload(db.Model):
    filename = db.Column(db.String(500), primary_key=True, unique=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    shared = db.Column(db.Boolean, nullable=False, default=False)

    def toDict(self):
        return {c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs}