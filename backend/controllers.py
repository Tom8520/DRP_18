import datetime
import os

from dotenv import load_dotenv
from flask import request, jsonify
import uuid

from sqlalchemy.exc import IntegrityError

from __init__ import db
from models import User
import jwt

load_dotenv()


def list_all_users_controller():
    users = User.query.all()
    response = []
    for user in users:
        response.append(user.toDict())
    return jsonify(response)


def create_account_controller():
    request_form = request.form.to_dict()

    new_account = User(
        email=request_form.get('email'),
        password=request_form.get('password'),
    )
    db.session.add(new_account)

    try:
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        return jsonify({"message": "User already exists"}), 400

    response = User.query.filter_by(email=request_form.get('email')).first().toDict()
    return jsonify(response)


def generate_jwt_token(user):
    return jwt.encode(
        {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1),
        },
        os.getenv('JWT_SECRET'),
        algorithm='HS256',
    )


def login_controller():
    request_form = request.args.to_dict()
    user = User.query.filter_by(email=request_form.get('email'), password=request_form.get("password")).first()

    if user:
        jwt_token = generate_jwt_token(user)
        User.query.filter_by(email=request_form.get('email')).update({"jwt": jwt_token})
        db.session.commit()

        return jsonify({
            'token': generate_jwt_token(user),
        })
    else:
        return jsonify({'error': 'Invalid Credentials'}), 401


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
