import os
from flask import request
from flask_cors import CORS, cross_origin

from controllers import list_all_users_controller, create_account_controller, login_controller
from __init__ import create_app
from dotenv import load_dotenv

load_dotenv()

app = create_app(os.getenv("CONFIG_MODE"))
CORS(app, support_credentials=True)


@app.route('/api')
@cross_origin(supports_credentials=True)
def hello():
    return "Hello World!"


@app.route("/api/signup", methods=['POST'])
@cross_origin(supports_credentials=True)
def create_account():
    return create_account_controller()


@app.route("/api/login", methods=['GET'])
@cross_origin(supports_credentials=True)
def login():
    return login_controller()


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
