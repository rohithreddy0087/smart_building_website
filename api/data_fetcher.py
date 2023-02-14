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
    """
    def __init__(self,
        config: ConfigFileparser,
        psql_conn,
        psql_cur
    ) -> None:
        self.config = config
        self.logger = config.logger
        self.psql_conn,self.psql_cur = psql_conn, psql_cur

    def check_table_exists(self,table_name):
        query = "select exists(select * from information_schema.tables where table_name='%s')"%(table_name)
        self.psql_cur.execute(query)
        rows = self.psql_cur.fetchone()
        if rows[0] is True:
            return True
        return False

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

    def fetch_data_between_interval(self,table_name: str, start_time: str, end_time: str)->List[Tuple]:
        """Fetches data between a time interval for a given table_name

        Args:
            table_name (str): Unique ID
            start_time (str): start time
            end_time (str): end time

        Returns:
            List[Tuple]: data fetched between interval
        """
        if not self.check_table_exists(table_name):
            return None
        query = "select time,number from %s where time between '%s' and '%s' order by time desc"%(table_name, start_time, end_time)
        self.logger.debug('%s',query)
        data = self.fetch_data(query)
        return data

    def fetch_latest_data(self,table_name: str, limit : int = 100)->List[Tuple]:
        """Fetches latest data with limit

        Args:
            table_name (str): Unique ID
            limit (int, optional): Number of latest lines. Defaults to 10.

        Returns:
            List[Tuple]: latest data fetched
        """
        if not self.check_table_exists(table_name):
            return None
        query = "select time,number from %s limit %s"%(table_name, limit)
        self.logger.debug('%s',query)
        data = self.fetch_data(query)
        return data

    def fetch_latest_entry(self,table_name: str)->List[Tuple]:
        """Fetches latest entry of an table_name

        Args:
            table_name (str): Unique ID

        Returns:
            List[Tuple]: latest entry
        """
        if not self.check_table_exists(table_name):
            return None
        query = "select time,number from %s order by time desc limit 1"%(table_name)
        data = self.fetch_data(query)
        if len(data)>0:
            return data[0][0]
        else:
            return None

    def fetch_first_entry(self,table_name: str)->List[Tuple]:
        """Fetches initial entry of an table_name

        Args:
            table_name (str): Unique ID

        Returns:
            List[Tuple]: latest entry
        """
        if not self.check_table_exists(table_name):
            return None
        query = "select time,number from %s order by time asc limit 1"%(table_name)
        data = self.fetch_data(query)
        if len(data)>0:
            return data[0][0]
        else:
            return None