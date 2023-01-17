"""
Postgres sql connection to fetch data
"""
from typing import Callable, List, Optional, Dict, Tuple
import re

import numpy as np
import pandas as pd
import psycopg2
from .config_parser import ConfigFileparser


class DataFetcher:
    """
    Fetches data from database

    Args:
        config (ConfigFileparser): Config file parser Instance

    Attributes:
        config (ConfigFileparser): Config file parser Instance
        psql_conn (): Postgres connection
        psql_cur (): Postgres cursor
        uuids (Dict): dict of uuids
    """
    def __init__(self,
        config: ConfigFileparser,
        psql_conn,
        psql_cur
    ) -> None:
        self.config = config
        self.psql_conn,self.psql_cur = psql_conn, psql_cur
        self.uuids = {}

    def fetch_data(self,query: str)->List[Tuple]:
        """ fetches data from database

        Args:
            query (str): query

        Returns:
            List[Tuple]: data
        """
        self.psql_cur.execute(query)
        rows = self.psql_cur.fetchall()
        return rows

    def fetch_data_between_interval(self,uuid: str, start_time: str, end_time: str)->List[Tuple]:
        """Fetches data between a time interval for a given uuid

        Args:
            uuid (str): Unique ID
            start_time (str): start time
            end_time (str): end time

        Returns:
            List[Tuple]: data fetched between interval
        """
        query = "select time,number from %s where uuid::text = '%s' and \
                    time between '%s' and '%s'"%(self.config.db_table, uuid, start_time, end_time)
        data = self.fetch_data(query)
        return data

    def fetch_latest_data(self,uuid: str, limit : int = 100)->List[Tuple]:
        """Fetches latest data with limit

        Args:
            uuid (str): Unique ID
            limit (int, optional): Number of latest lines. Defaults to 10.

        Returns:
            List[Tuple]: latest data fetched
        """
        query = "select time,number from %s where uuid::text = '%s' limit %s"%(self.config.db_table, uuid, limit)
        data = self.fetch_data(query)
        return data

    def fetch_latest_entry(self,uuid: str)->List[Tuple]:
        """Fetches latest entry of an uuid

        Args:
            uuid (str): Unique ID

        Returns:
            List[Tuple]: latest entry
        """
        query = "select time,number from %s where uuid::text = '%s' order by time desc limit 1"%(self.config.db_table, uuid)
        print(query)
        data = self.fetch_data(query)
        if len(data)>0:
            return data[0][0]
        else:
            return None

    def fetch_first_entry(self,uuid: str)->List[Tuple]:
        """Fetches initial entry of an uuid

        Args:
            uuid (str): Unique ID

        Returns:
            List[Tuple]: latest entry
        """
        query = "select time,number from %s where uuid::text = '%s' order by time asc limit 1"%(self.config.db_table, uuid)
        print(query)
        data = self.fetch_data(query)
        if len(data)>0:
            return data[0][0]
        else:
            return None

