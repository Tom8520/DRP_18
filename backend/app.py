import os
from flask import request

from controllers import list_all_users_controller, create_account_controller, login_controller
from __init__ import create_app
from dotenv import load_dotenv

load_dotenv()

app = create_app(os.getenv("CONFIG_MODE"))


@app.route('/api')
def hello():
    return "Hello World!"


@app.route("/api/signup", methods=['POST'])
def create_account():
    return create_account_controller()


@app.route("/api/login", methods=['GET'])
def login():
    return login_controller()


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
