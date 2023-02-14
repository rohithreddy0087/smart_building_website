"""
Data loader
"""
from typing import Tuple
from collections import OrderedDict
import re
import os
import json

import numpy as np
import pandas as pd
from config_parser import ConfigFileparser
from config_parser import get_config
from data_fetcher import DataFetcher
from psql import DataBase


class DataLoader:
    """
    Loads data from csv into json files

    Args:
        config (ConfigFileparser): Config file parser Instance
        meta_json_file (str): Json file path to read building details from
        building_details_file (str): building details file

    Attributes:
        config (ConfigFileparser): Config file parser Instance
        building_details_file (str): building details file
        data_fetcher_obj (DataFetcher): DataFetcher Instance
    """
    def __init__(self,
        config: ConfigFileparser,
        building_details_file: str
    ) -> None:
        self.config = config
        self.building_details_file = building_details_file
        db = DataBase(config)
        psql_conn, psql_cur = db.create_psql()
        self.data_fetcher_obj = DataFetcher(self.config, psql_conn, psql_cur)
        self.__building_data = OrderedDict()
        self.__match_strs = {
            "NAE-01" : "Room [0-9][0-9][0-9]"
        }
        self.logger = config.logger
    
    @property
    def building_data(self)->dict:
        """getter for building data

        Returns:
            dict: building_data
        """
        return self.__building_data
    
    def get_match_str(self,building_name:str)->str:
        """gets matching string to extract room numbers from csv file

        Args:
            building_name (str): name of the building

        Returns:
            match (str): match string to extract room numbers from csv file
        """
        default_match_str = "[0-9]{3,5}"
        if building_name in self.__match_strs:
            return self.__match_strs[building_name]
        return default_match_str

    def get_unique_features(self, building_name, match_str = "Room [0-9][0-9][0-9]"):
        """Unique features in building

        Args:
            building_name (str): building file

        Returns:
            features_dict (dict): keys as features and values as number of rooms
        """
        self.logger.debug("========================================================")
        df = pd.read_csv(building_name)
        self.logger.debug("Total number of columns : %s",len(df.description))
        unq_features = df.description.unique()
        self.logger.debug("Total number of unique features : %s",len(unq_features))
        rooms = {}
        for i,name in enumerate(df.jci_name):
            if name is np.nan:
                continue
            match = re.search(match_str, name)
            if match is not None:
                room_no = name[match.start():match.end()]
                if room_no in rooms:
                    rooms[room_no].append(df.description[i])
                else:
                    rooms[room_no] = [df.description[i]]

        self.logger.debug("Total number of rooms in given building : %s",len(rooms))
        features_dict = {}
        for _,room in rooms.items():
            for feature in room:
                if feature in features_dict:
                    features_dict[feature] += 1
                else:
                    features_dict[feature] = 1
        self.logger.debug("Total number of distinct features available for rooms : %s", len(features_dict))
        ret_features = []
        for feature, feature_values in features_dict.items():
            if feature_values > len(rooms)-20:
                ret_features.append(feature)
        # total_rooms += len(rooms)
        ret_features = [item for item in ret_features if isinstance(item, str)]
        self.logger.debug("========================================================")
        return ret_features, features_dict


    def get_building_name(self,building_devices_file: str)->Tuple[str,str,int]:
        """get building name from building_devices_file

        Args:
            building_devices_file (str): building devices file

        Returns:
            desc (str): building desc
            name (str): building name
            device_id (int): device id
        """
        match = re.search('[0-9]{3,5}', building_devices_file)
        device_id = int(building_devices_file[match.start():match.end()])
        df = pd.read_csv(building_details_file)
        idx = df.index[df.device_id == device_id]
        df_new = df.iloc[idx]
        desc = df_new.description[idx[0]]
        if isinstance(desc, float) :
            desc = None
        name = df_new.name[idx[0]]
        return desc, name, device_id

    def load_data(self,building_devices_file: str):
        """load data into __building_data dict

        Args:
            building_devices_file (str): building devices file
        """
        df = pd.read_csv(building_devices_file)
        building_description, building_name, device_id = self.get_building_name(building_devices_file)
        match_str = self.get_match_str(building_name)
        most_common_features,_ = self.get_unique_features(building_devices_file,match_str)
        self.__building_data[building_name] = {}
        self.__building_data[building_name]["meta"] = {}
        self.__building_data[building_name]["items"] = {}
        self.__building_data[building_name]["meta"]["description"] = building_description
        self.__building_data[building_name]["meta"]["device_id"] = device_id
        self.__building_data[building_name]["meta"]["file_location"] = building_devices_file
        self.__building_data[building_name]["meta"]["most_common_features"] = most_common_features

        for i,name in enumerate(df.jci_name):
            if name is np.nan:
                continue
            match = re.search(match_str, name)
            if match is not None:
                room_no = name[match.start():match.end()]
                for feature in most_common_features:
                    if df.description[i] == feature:
                        table_name = f"{building_name}_{room_no}_{feature}"
                        table_name = table_name.replace(" ","_").strip().lower()
                        table_name = table_name.replace("-","_").strip().lower()
                        table_name = table_name.replace("/","_")
                        latest_timestamp = self.data_fetcher_obj.fetch_latest_entry(table_name)
                        initial_timestamp = self.data_fetcher_obj.fetch_first_entry(table_name)
                        if building_name in self.__building_data:
                            if room_no in self.__building_data[building_name]["items"]:
                                self.__building_data[building_name]["items"][room_no][feature] = {
                                        "uuid": df.uuid[i],
                                        "inital_timestamp": str(initial_timestamp),
                                        "final_timestamp": str(latest_timestamp)
                                }
                            else:
                                self.__building_data[building_name]["items"][room_no] = {}
                                self.__building_data[building_name]["items"][room_no][feature] = {
                                        "uuid": df.uuid[i],
                                        "inital_timestamp": str(initial_timestamp),
                                        "final_timestamp": str(latest_timestamp)
                                }
                        else:
                            self.__building_data[building_name]["items"][room_no] = {}
                            self.__building_data[building_name]["items"][room_no][feature] = {
                                        "uuid": df.uuid[i],
                                        "inital_timestamp": str(initial_timestamp),
                                        "final_timestamp": str(latest_timestamp)
                                }
        self.__building_data[building_name]["items"] = OrderedDict(sorted(self.__building_data[building_name]["items"].items()))
    
    def read_from_csv(self,data_dir:str = "object_list/results.bak/"):
        """reads from csv and loads data into dict

        Args:
            data_dir (str, optional): _description_. Defaults to "object_list/results.bak/".
        """
        dir_list = os.listdir(data_dir)
        for file in dir_list:
            building_name = data_dir + file
            if "objects" in building_name and "lock" not in building_name:
                self.load_data(building_name)
    
    def save_dict_as_json(self):
        """save building dict as json
        """
        self.__building_data = OrderedDict(sorted(self.__building_data.items()))
        json.dump( self.__building_data, open("building_data.json", 'w') )


if __name__ == "__main__":
    data_dir = "object_list/results.bak/"
    building_details_file = "object_list/results.bak/bacnet_devices.csv"
    global_var = {}
    config = get_config(global_var,configfile="config.ini")
    dir_list = os.listdir(data_dir)
    dataLoaderObj = DataLoader(config, building_details_file)
    dataLoaderObj.read_from_csv(data_dir)
    dataLoaderObj.save_dict_as_json()
    config.logger.debug(f"Length {len(dataLoaderObj.building_data)}")