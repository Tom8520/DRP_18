import base64
import os

import botocore
from flask import request, jsonify, send_file
from flask_cors import CORS, cross_origin

from utils import verify_jwt_token, generate_jwt_token
from controllers import list_all_users_controller, create_account_controller, login_controller, upload_image_controller, \
    get_images_controller, verify_image_owner
from __init__ import create_app
from dotenv import load_dotenv
import boto3

load_dotenv()

# with open('tmp/image.png', 'wb') as f:
#     s3.download_fileobj('drp18-image-storage', 'Screenshot from 2024-06-05 14-32-00.png', f)

app = create_app(os.getenv("CONFIG_MODE"))
CORS(app, support_credentials=True)


@app.route('/api')
@cross_origin(supports_credentials=True)
def hello():
    print("test")
    return "Hello World!"


@app.route("/api/signup", methods=['POST'])
@cross_origin(supports_credentials=True)
def create_account():
    return create_account_controller()


@app.route("/api/login", methods=['GET'])
@cross_origin(supports_credentials=True)
def login():
    return login_controller()


@app.route("/api/upload", methods=['POST'])
@cross_origin(supports_credentials=True)
@verify_jwt_token
def upload_image(user):
    file = request.files.get('file')
    shared = request.form.get('organisation')

    if file is None or shared is None:
        return jsonify({"message": "no file found"}), 400

    file.save(f"tmp/{user}.{file.filename.split('.')[-1]}")

    s3_filename = generate_jwt_token(user) + ".png"

    s3 = boto3.client('s3', region_name='eu-north-1')
    s3.upload_file(f"tmp/{user}.{file.filename.split('.')[-1]}", os.getenv("S3_BUCKET_NAME"), s3_filename)
    upload_image_controller(user, s3_filename, True if shared == "true" else False)

    return jsonify({"message": "uploaded successfully"}), 200


@app.route("/api/getImages", methods=['GET'])
@cross_origin(supports_credentials=True)
@verify_jwt_token
def get_images(user):
    typ = request.args.get("type")
    images = get_images_controller(user, typ)

    return jsonify({"images": images})


@app.route("/api/downloadImage", methods=['GET'])
@cross_origin(supports_credentials=True)
@verify_jwt_token
def download_image(user):
    filename = request.args.get("filename")

    if filename is None:
        return jsonify({"message": "no filename"}), 400

    if not verify_image_owner(user, filename):
        return jsonify({"message": "unauthorized"}), 401

    s3 = boto3.client('s3', region_name='eu-north-1')
    with open(f'tmp/{user}.png', 'wb') as f:
        s3.download_fileobj(os.getenv("S3_BUCKET_NAME"), filename, f)

    with open(f'tmp/{user}.png', 'rb') as image_file:
        encoded_string = base64.b64encode(image_file.read()).decode('utf-8')

    return jsonify({'image': encoded_string})


@app.route("/api/getComments", methods=['GET'])
@cross_origin(supports_credentials=True)
@verify_jwt_token
def get_comments(user):
    filename = request.args.get("filename")

    if filename is None:
        return jsonify({"message": "no filename"}), 400

    if not verify_image_owner(user, filename):
        return jsonify({"message": "unauthorized"}), 401

    s3 = boto3.client('s3', region_name='eu-north-1')
    with open(f'tmp/{user}.txt', 'wb') as f:
        s3.download_fileobj(os.getenv("S3_BUCKET_NAME"), filename + "_notes.txt", f)

    with open(f'tmp/{user}.txt', 'r') as file:
        notes = file.read()

    return jsonify({"comments": notes.split("\n")})


@app.route("/api/saveComment", methods=['POST'])
@cross_origin(supports_credentials=True)
@verify_jwt_token
def save_comment(user):
    filename = request.form.get("filename")
    comment = request.form.get("comment")

    if filename is None:
        return jsonify({"message": "no filename"}), 400

    if not verify_image_owner(user, filename):
        return jsonify({"message": "unauthorized"}), 401

    s3 = boto3.client('s3', region_name='eu-north-1')
    try:
        with open(f'tmp/{user}.txt', 'wb') as f:
            s3.download_fileobj(os.getenv("S3_BUCKET_NAME"), filename + "_notes.txt", f)

        with open(f'tmp/{user}.txt', 'r') as file:
            notes = file.read()
    except botocore.exceptions.ClientError as e:
        notes = ""

    notes += comment + "\n"

    with open(f'tmp/{user}.txt', 'w') as file:
        file.write(notes)

    s3.upload_file(f"tmp/{user}.txt", os.getenv("S3_BUCKET_NAME"), filename + "_notes.txt")

    return jsonify({"comments": notes.split("\n")})




@app.route("/api/secret", methods=['GET', 'POST'])
@verify_jwt_token
def get_secret(user):
    return "secret {}".format(user)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8001, debug=True)
