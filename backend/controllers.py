from flask import request, jsonify
import uuid

from __init__ import db
from models import User


def list_all_users_controller():
    users = User.query.all()
    response = []
    for user in users:
        response.append(user.toDict())
    return jsonify(response)


def create_account_controller():
    request_form = request.form.to_dict()

    user_id = str(uuid.uuid4())
    new_account = User(
        id=user_id,
        email=request_form['email'],
        password=request_form['password'],
    )
    db.session.add(new_account)
    db.session.commit()

    response = User.query.get(user_id).toDict()
    return jsonify(response)


def retrieve_account_controller(user_id):
    response = User.query.get(user_id).toDict()
    return jsonify(response)


def update_account_controller(user_id):
    request_form = request.form.to_dict()
    user = User.query.get(user_id)

    user.email = request_form['email']
    user.password = request_form['password']
    db.session.commit()

    response = User.query.get(user_id).toDict()
    return jsonify(response)


def delete_account_controller(user_id):
    User.query.filter_by(id=user_id).delete()
    db.session.commit()

    return ('Account with Id "{}" deleted successfully!').format(user_id)
