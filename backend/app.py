import os
from flask import request

from controllers import list_all_users_controller, create_account_controller
from __init__ import create_app
from dotenv import load_dotenv

load_dotenv()

app = create_app(os.getenv("CONFIG_MODE"))


@app.route('/')
def hello():
    return "Hello World!"


@app.route("/signup", methods=['GET', 'POST'])
def list_create_accounts():
    if request.method == 'GET':
        return list_all_users_controller()
    if request.method == 'POST':
        return create_account_controller()
    else:
        return 'Method is Not Allowed'


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
