from flask import Flask, render_template, request, send_file, make_response, jsonify
from flask_cors import CORS

from api.config_parser import get_config
from api.psql import DataBase
from api.data_interface import DataInterface
from api.registration import Register

app = Flask(__name__)
CORS(app)

@app.route("/api/register", methods=['POST'])
def register():
    """_summary_
    """
    data = request.json
    message = register_obj.insert_new_user(data)
    return {"message":message}

if __name__ == '__main__':

    global_var = {}
    config = get_config(global_var,configfile="config.ini")
    db = DataBase(config)
    psql_conn, psql_cur = db.create_psql()
    data_interface_obj = DataInterface(config, psql_conn, psql_cur)
    register_obj = Register(config, psql_conn, psql_cur)
    app.run()

