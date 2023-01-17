"""
Data Parser for data fetched from database
"""
import os
from pathlib import Path
from typing import List,Tuple
import json

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
    
    def __get_data_between_interval(self, uuid: str, start_time: str, end_time: str)-> List[Tuple]:
        """Fetches and Parses data between a time interval for a given uuid

        Args:
            uuid (str): Unique ID
            start_time (str): start time
            end_time (str): end time

        Returns:
            List[Tuple]: data fetched between interval
        """
        rows = self.data_fetcher_obj.fetch_data_between_interval(uuid,start_time,end_time)
        feature_data = self.parse_feature_data(rows)
        return feature_data

    def __get_data_with_limit(self, uuid: str,limit: int = 10)-> List[Tuple]:
        """Fetches and parseslatest data with limit

        Args:
            uuid (str): Unique ID
            limit (int, optional): Number of latest lines. Defaults to 10.

        Returns:
            List[Tuple]: latest data fetched
        """
        rows = self.data_fetcher_obj.fetch_latest_data(uuid,limit)
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
                    feature_dict["id"] = uuid[10:]
                    if start_time is not None and end_time is not None:
                        feature_dict["data"] = self.__get_data_between_interval(uuid,start_time,end_time)
                    else:
                        feature_dict["data"] = self.__get_data_with_limit(uuid,limit)
                item_dict["recorded_features"].append(feature_dict)
            items_list.append(item_dict)
        return items_list