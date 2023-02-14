"""
Data Parser for data fetched from database
"""
import os
from pathlib import Path
from typing import List,Tuple
import json
import csv
import datetime
import numpy as np
import pandas as pd

import time

from .data_fetcher import DataFetcher
from .config_parser import ConfigFileparser

class DataParser:
    """Parse data and save it as json

    Args:
        config (ConfigFileparser): Config file parser Instance
        meta_json_file (str): Json file path to read building details from
    
    Attributes:
        config (ConfigFileparser): Config file parser Instance
        data_fetcher_obj (DataFetcher): DataFetcher Instance
    """
    def __init__(self,
        config: ConfigFileparser,
        psql_conn,
        psql_cur,
        meta_json_file : str = "building_data.json"
    ) -> None:
        self.config = config
        path = Path(__file__)
        ROOT_DIR = path.parent.absolute()
        meta_json_path = os.path.join(ROOT_DIR, meta_json_file)
        meta_file = open(meta_json_path)
        self.__meta = json.load(meta_file)
        self.data_fetcher_obj = DataFetcher(self.config,psql_conn,psql_cur)
    
    def __get_data_between_interval(self, table_name: str, start_time: str, end_time: str, initial: str, final: str)-> List[Tuple]:
        """Fetches and Parses data between a time interval for a given table_name

        Args:
            table_name (str): Unique ID
            start_time (str): start time
            end_time (str): end time

        Returns:
            List[Tuple]: data fetched between interval
        """
        initial = datetime.datetime.strptime(initial,"%Y-%m-%d %H:%M:%S.%f")
        final = datetime.datetime.strptime(final,"%Y-%m-%d %H:%M:%S.%f")
        print(initial,final)
        if start_time < initial or start_time is None:
            start_time = initial
        if end_time < initial or end_time is None:
            end_time = final
        rows = self.data_fetcher_obj.fetch_data_between_interval(table_name,start_time,end_time)
        # feature_data = self.parse_feature_data(rows)
        return rows

    def __get_data_with_limit(self, table_name: str,limit: int = 10)-> List[Tuple]:
        """Fetches and parseslatest data with limit

        Args:
            table_name (str): Unique ID
            limit (int, optional): Number of latest lines. Defaults to 10.

        Returns:
            List[Tuple]: latest data fetched
        """
        rows = self.data_fetcher_obj.fetch_latest_data(table_name,limit)
        feature_data = self.parse_feature_data(rows)
        return feature_data

    def parse_feature_data(self, data: List[Tuple])->List[dict]:
        """Parses data fetched from database

        Args:
            data (List[Tuple]): fetched data

        Returns:
            List[dict]: list of data with time and values
        """
        data_list = []
        for d in data:
            data_dict = {}
            data_dict["time"] = str(d[0])
            data_dict["value"] = d[1]
            data_list.append(data_dict)
        return data_list

    def create_meta_dict(self,building_name: str, start_time: str, end_time: str, limit: int, features: List[str])->dict:
        """Generates meta dict that contains basic info

        Args:
            building_name (str): name of the building
            start_time (str): start time
            end_time (str): end time
            limit (int): Number of rows
            features (List[str]): list of features

        Returns:
            dict: Meta details
        """
        if not features:
            features = self.__meta[building_name]["meta"]["most_common_features"]
        meta_dict = {
            "building_name": building_name,
            "start_time": start_time,
            "end_time": end_time,
            "total_rooms": len(self.__meta[building_name]["items"]),
            "features": features,
            "line_limit": limit
        }
        return meta_dict

    def create_items_list(self,building_name: str, start_time: str, end_time: str, limit: int, features: List[str])->List[dict]:
        """Generates items list

        Args:
            building_name (str): name of the building
            start_time (str): start time
            end_time (str): end time
            limit (int): number of rows
            features (List[str]): list of features

        Returns:
            List[dict]: items list
        """
        items_list = []

        if not features:
            features = self.__meta[building_name]["meta"]["most_common_features"]
        for room_no in self.__meta[building_name]["items"]:
            item_dict = {}
            item_dict["room_id"] = room_no
            item_dict["recorded_features"] = []
            for feature in features:
                feature_dict = {}
                feature_dict["feature"] = feature
                if feature in self.__meta[building_name]["items"][room_no]:
                    uuid = self.__meta[building_name]["items"][room_no][feature]["uuid"]
                    initial_ts = self.__meta[building_name]["items"][room_no][feature]["inital_timestamp"]
                    final_ts = self.__meta[building_name]["items"][room_no][feature]["final_timestamp"]
                    feature_dict["id"] = uuid[10:]
                    table_name = f"{building_name}_{room_no}_{feature}"
                    table_name = table_name.replace(" ","_").strip().lower()
                    table_name = table_name.replace("-","_").strip().lower()
                    table_name = table_name.replace("/","_")
                    if start_time is not None and end_time is not None:
                        feature_dict["data"] = self.__get_data_between_interval(table_name,start_time,end_time,initial_ts,final_ts)
                    else:
                        feature_dict["data"] = self.__get_data_with_limit(table_name,limit)
                item_dict["recorded_features"].append(feature_dict)
            items_list.append(item_dict)
        return items_list
    
    def generate_meta_csv(self,building_name: str, start_time: str, end_time: str, limit: int, features: List[str]):
        """Generates meta csv file that contains basic info

        Args:
            building_name (str): name of the building
            start_time (str): start time
            end_time (str): end time
            limit (int): Number of rows
            features (List[str]): list of features

        """
        if not os.path.exists(f"{self.config.download_path}/{building_name}"):
            os.mkdir(f"{self.config.download_path}/{building_name}")
        filename = f"{self.config.download_path}/{building_name}/meta.csv"
        fields = ['building_name','start_time','end_time','total_rooms','features','line_limit']
        rows = [building_name,str(start_time),str(end_time),str(len(self.__meta[building_name]["items"])),'h',str(limit)] #";".join(features)
        print(rows)
        with open(filename, 'w') as csvfile:
            csvwriter = csv.writer(csvfile,delimiter=',', quoting=csv.QUOTE_NONE) 
            csvwriter.writerow(fields)
            # csvwriter.writerows("null" if x is None else x for x in rows)
            csvwriter.writerow(rows)
    
    def round_time(self, dt=None, dateDelta=datetime.timedelta(minutes=1)):
        """Round a datetime object to a multiple of a timedelta
        dt : datetime.datetime object, default now.
        dateDelta : timedelta object, we round to a multiple of this, default 1 minute.
        """
        roundTo = dateDelta.total_seconds()
        if isinstance(dt, str): 
            dt = datetime.datetime.strptime(dt, '%Y-%m-%d %H:%M:%S.%f')
        if dt is None :
            dt = datetime.datetime.now()
        seconds = (dt - dt.min).seconds
        rounding = (seconds+roundTo/2) // roundTo * roundTo
        return dt + datetime.timedelta(0,rounding-seconds,-dt.microsecond)

    def generate_items_csv(self,building_name: str, start_time: str, end_time: str, limit: int, features: List[str]):
        """Generates items csv

        Args:
            building_name (str): name of the building
            start_time (str): start time
            end_time (str): end time
            limit (int): number of rows
            features (List[str]): list of features

        Returns:
            List[dict]: items list
        """
        
        if not features:
            features = self.__meta[building_name]["meta"]["most_common_features"]
        time_1 = self.round_time(start_time,datetime.timedelta(minutes=5))
        time_2 = self.round_time(end_time,datetime.timedelta(minutes=5))

        df = pd.DataFrame(columns = ['Timestamp'] + features)
        # df["uuids"] = ["null"]*len(features)
        times = pd.date_range(start=time_1,end=time_2,freq='5T').tolist()
        df['Timestamp'] = times[1:-1]
        for room_no in self.__meta[building_name]["items"]:
            if room_no not in ['Room 104'] :
                continue
            filename = f"{self.config.download_path}/{building_name}/{room_no}.csv"
            for feature in features:
                if feature in self.__meta[building_name]["items"][room_no]:
                    uuid = self.__meta[building_name]["items"][room_no][feature]["uuid"]
                    initial_ts = self.__meta[building_name]["items"][room_no][feature]["inital_timestamp"]
                    final_ts = self.__meta[building_name]["items"][room_no][feature]["final_timestamp"]
                    # if uuid[10:] not in rows:
                    #     df["uuids"][f] = uuid[10:]
                    table_name = f"{building_name}_{room_no}_{feature}"
                    table_name = table_name.replace(" ","_").strip().lower()
                    table_name = table_name.replace("-","_").strip().lower()
                    table_name = table_name.replace("/","_")
                    if start_time is not None and end_time is not None:
                        data_dict = self.__get_data_between_interval(table_name,start_time,end_time,initial_ts,final_ts)
                    else:
                        data_dict = self.__get_data_with_limit(table_name,limit)
                    for data in data_dict:
                        t = self.round_time(data[0],datetime.timedelta(minutes=5))
                        df.loc[df['Timestamp']==t,feature] = str(data[1])
            df.to_csv(filename,index_label="S.No")