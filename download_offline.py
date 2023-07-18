from datetime import datetime, timedelta
import json

from api.config_parser import get_config
from api.psql import DataBase
from api.data_interface import DataInterface
from api.registration import Register

initial_timestamp = "2020-04-15 11:19:48.758219"
final_timestamp = "2020-12-04 00:03:40.121161"

# Convert the timestamps to datetime objects
initial_date = datetime.strptime(initial_timestamp, "%Y-%m-%d %H:%M:%S.%f")
final_date = datetime.strptime(final_timestamp, "%Y-%m-%d %H:%M:%S.%f")

# Calculate the start and end dates of each month
dates = []
current_date = initial_date.replace(day=1)
while current_date <= final_date:
    last_day = current_date.replace(day=1) + timedelta(days=32)
    last_day = last_day.replace(day=1, hour=0, minute=0, second=0, microsecond=0) - timedelta(days=1)
    end_date = min(last_day, final_date)
    dates.append((current_date, end_date))
    print(current_date, end_date)
    if current_date.month > 11:
        break
    current_date = current_date.replace(month=current_date.month+1,hour=0, minute=0, second=0, microsecond=0)

global_var = {}
config = get_config(global_var,configfile="config.ini")
db = DataBase(config)
psql_conn, psql_cur = db.create_psql()
data_interface_obj = DataInterface(config, psql_conn, psql_cur)
building_name = "NAE-01"
# Print the results
for start, end in dates:
    data_interface_obj.fetch_and_save_data_csv(
                building_name = building_name,
                start_time = start,
                end_time= end,
                limit = 10,
                features = None
            )
    break
