import datetime
import os
from calendar import timegm

import jwt
from flask import request, jsonify


def generate_jwt_token(id):
    return jwt.encode(
        {
            'id': id,
            'exp': timegm((datetime.datetime.utcnow() + datetime.timedelta(hours=1)).utctimetuple()),
        },
        os.getenv('JWT_SECRET'),
        algorithm='HS256',
    )


def verify_jwt_token(endpoint):
    def logged_in_endpoint():
        token = request.headers.get('Authorization')

        if token is None:
            return jsonify({'message': 'Token is missing'}), 401

        try:
            data = jwt.decode(bytes(token, 'utf-8'), os.getenv('JWT_SECRET'), algorithms=['HS256'])
        except jwt.exceptions.DecodeError:
            return jsonify({'message': 'Token is invalid'}), 401
        except jwt.exceptions.ExpiredSignatureError:
            return jsonify({"message": "login has timed out"}), 440
        except:
            return jsonify({'message': 'Unknown error'}), 500

        return endpoint(data.get('id'))

    logged_in_endpoint.__name__ = endpoint.__name__
    return logged_in_endpoint
