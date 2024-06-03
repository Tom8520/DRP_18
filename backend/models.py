from sqlalchemy import inspect
from __init__ import db


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False, unique=True, autoincrement=True)
    email = db.Column(db.String(100), nullable=False, unique=True)
    password = db.Column(db.String(100), nullable=False)
    jwt = db.Column(db.String(500))

    def toDict(self):
        return {c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs}

    def __repr__(self):
        return "<%r>" % self.email
