from typing import Callable, List, Tuple, Dict
import os
import zipfile
import shutil
import json

from .data_parser import DataParser
from .config_parser import ConfigFileparser
from .config_parser import get_config


class DataInterface:
    """Data Interface class

    Args:
        config (ConfigFileparser): Config file parser Instance
    
    Attributes:
        config (ConfigFileparser): Config file parser Instance
        data_parser_obj (DataParser): DataParser Instance
    """
    def __init__(self,
        config: ConfigFileparser,
        psql_conn,
        psql_cur
    ) -> None:
        self.config = config
        self.data_parser_obj = DataParser(self.config,psql_conn,psql_cur)
        self.__meta_dict = {}
        self.__items_list = []

    @property
    def meta_dict(self)->dict:
        """getter of meta_dict

        Returns:
            dict: contains meta information
        """
        return self.__meta_dict
    
    @property
    def items_list(self)->dict:
        """getter of items list

        Returns:
            dict: contians items data
        """
        return self.__items_list
    

    def fetch_and_save_data_json(self, building_name: str, start_time: str = None, end_time: str = None, limit: int = 100, features: List[str] = None):
        """fetches data and saves as a json file

        Args:
            building_name (str): name of the building
            start_time (str, optional): start time. Defaults to None.
            end_time (str, optional): end time. Defaults to None.
            limit (int, optional): Number of rows. Defaults to 100.
            features (List[str], optional): list of features. Defaults to None.

        Returns:
            json_dict (dict): meta and items list dict
        """
        self.__meta_dict = self.data_parser_obj.create_meta_dict(building_name,start_time,end_time,limit,features)
        self.__items_list = self.data_parser_obj.create_items_list(building_name,start_time,end_time,limit,features)
        json_dict = {
            "meta": self.__meta_dict,
            "items": self.__items_list
        }
        # json.dump( json_dict, open( f"{self.config.download_path}/{building_name}.json", 'w' ) )
        return json_dict
        
    
    def fetch_and_save_data_csv(self, building_name: str, start_time: str = None, end_time: str = None, limit: int = 100, features: List[str] = None):
        """fetches data and save as zip file

        Args:
            building_name (str): name of the building
            start_time (str, optional): start time. Defaults to None.
            end_time (str, optional): end time. Defaults to None.
            limit (int, optional): Number of rows. Defaults to 100.
            features (List[str], optional): list of features. Defaults to None.

        """
        self.data_parser_obj.generate_meta_csv(building_name,start_time,end_time,limit,features)
        self.data_parser_obj.generate_items_csv(building_name,start_time,end_time,limit,features)
        shutil.make_archive(f"{self.config.download_path}/{building_name}", 'zip', f"{self.config.download_path}/{building_name}")