from flask import Flask, request, send_from_directory
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

@app.route("/api/data", methods=['POST'])
def data():
    """_summary_
    """
    payload = request.json
    print(payload)
    email = payload["usermail"]
    password = payload["password"]
    lines = 10
    text_message =  None
    if register_obj.check_if_user_exists(email):
        if register_obj.check_user_credentials(email,password):
            lines = data["lineValue"]
            text_message = "User Verified"
        else:
            text_message = "Wrong password"
    else:
        text_message =  "User doesn't exist"

            
    # try:
    #     message = data_interface_obj.fetch_and_save_data(
    #         building_name = payload["buildingName"],
    #         start_time = None,
    #         end_time= None, 
    #         limit = lines, 
    #         features = None
    #     )
    # except Exception as err:
    #     text_message = "Internal Error"
    #     config.log("Data %s",err)
    print(text_message)
    return {"message":text_message}
if __name__ == '__main__':

    global_var = {}
    config = get_config(global_var,configfile="config.ini")
    db = DataBase(config)
    psql_conn, psql_cur = db.create_psql()
    data_interface_obj = DataInterface(config, psql_conn, psql_cur)
    register_obj = Register(config, psql_conn, psql_cur)
    app.run()

