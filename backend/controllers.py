import datetime
import os
from dotenv import load_dotenv
from flask import request, jsonify
import uuid

from sqlalchemy.exc import IntegrityError

from __init__ import db
from utils import generate_jwt_token
from models import User, ImageUpload
import jwt

load_dotenv()


def list_all_users_controller():
    users = User.query.all()
    response = []
    for user in users:
        response.append(user.toDict())
    return jsonify(response)


def create_account_controller():
    request_form = request.get_json()

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
    user = User.query.filter_by(email=request_form.get('email'), password=request_form.get("password")).first()

    if user:
        jwt_token = generate_jwt_token(user.id)
        User.query.filter_by(email=request_form.get('email')).update({"jwt": jwt_token})
        db.session.commit()

        return jsonify({
            'token': generate_jwt_token(user),
        })
    else:
        return jsonify({'error': 'Invalid Credentials'}), 401


def login_controller():
    request_form = request.args.to_dict()

    user = User.query.filter_by(email=request_form.get('email'), password=request_form.get("password")).first()

    if user:
        jwt_token = generate_jwt_token(user.id)
        User.query.filter_by(email=request_form.get('email')).update({"jwt": jwt_token})
        db.session.commit()

        return jsonify({
            'token': jwt_token,
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


def upload_image_controller(user_id, filename):
    upload = ImageUpload(
        user=user_id,
        filename=filename,
    )

    db.session.add(upload)

    try:
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        return jsonify({"message": "Error uploading image"}), 500


def get_images_controller(user_id):
    images = ImageUpload.query.filter_by(user_id=user_id)

    return [image.filename for image in images.all()]
