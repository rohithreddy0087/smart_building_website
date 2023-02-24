from flask import Flask, request, send_from_directory
from flask_cors import CORS
from datetime import datetime
import json

from api.config_parser import get_config
from api.psql import DataBase
from api.data_interface import DataInterface
from api.registration import Register

app = Flask(__name__)
CORS(app)

@app.after_request
def set_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "*"
    return response

@app.route("/api/register", methods=['POST'])
def register():
    """_summary_
    """
    data = request.json
    message = register_obj.insert_new_user(data)
    return {"message":message}

@app.route("/api/data", methods=['POST'])
def data():
    """_summary_
    """
    # print(request.data)
    # payload = json.loads(request.get_data())
    # print(request.get_json())
    payload = request.json
    print(payload)
    building_name = payload["buildingName"]
    email = payload["usermail"]
    password = payload["password"]
    type_file = payload["filetype"]
    options = payload["optionSelected"]
    features = []
    for option in options:
        features.append(option['value'])
    lines = 10
    from_time = None
    to_time = None
    text_message =  None
    if register_obj.check_if_user_exists(email):
        if register_obj.check_user_credentials(email,password):
            # lines = int(payload["lineValue"])
            from_time = datetime.strptime(payload["fromValue"],'%m/%d/%Y, %I:%M:%S %p')
            to_time = datetime.strptime(payload["toValue"],'%m/%d/%Y, %I:%M:%S %p')
            text_message = "User Verified"
        else:
            text_message = "Wrong password"
    else:
        text_message =  "User doesn't exist"

    try:
        # if type_file == "csv":
        #     data_interface_obj.fetch_and_save_data_csv(
        #         building_name = building_name,
        #         start_time = from_time,
        #         end_time= to_time,
        #         limit = lines,
        #         features = features
        #     )
        # else:
        ret = data_interface_obj.fetch_and_save_data_json(
            building_name = building_name,
            start_time = from_time,
            end_time= to_time,
            limit = lines,
            features = features
        )

    except Exception as err:
        text_message = "Internal Error"
        config.logger.debug("Data %s",err)
    print(text_message)
    return {"message":text_message, "data":ret}

if __name__ == '__main__':
    global_var = {}
    config = get_config(global_var,configfile="config.ini")
    db = DataBase(config)
    psql_conn, psql_cur = db.create_psql()
    data_interface_obj = DataInterface(config, psql_conn, psql_cur)
    register_obj = Register(config, psql_conn, psql_cur)
    app.run()

