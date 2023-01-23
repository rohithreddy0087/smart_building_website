"""
Postgres sql connection to fetch data
"""
from typing import Callable, List, Optional, Dict, Tuple
import re

import numpy as np
import pandas as pd
import psycopg2
from .config_parser import ConfigFileparser


class Register:
    """
    Fetches and Inserts user data from database

    Args:
        config (ConfigFileparser): Config file parser Instance

    Attributes:
        config (ConfigFileparser): Config file parser Instance
    """
    def __init__(self,
        config: ConfigFileparser,
        psql_conn,
        psql_cur
    ) -> None:
        self.config = config
        self.logger = config.logger
        self.psql_conn,self.psql_cur = psql_conn, psql_cur

    def insert_new_user(self, data: dict)->str:
        """Inserts new user details to database

        Args:
            data (dict): user data

        Returns:
            message (str): success/fail message
        """
        if self.check_if_user_exists(data['usermail']):
            return "User already exists"
        
        try:
            query = f"insert into users(FIRSTNAME,LASTNAME,EMAIL,AFFILIATION,AFFILIATION_TYPE,JOB)\
                        values ('{data['firstName']}','{data['lastName']}','{data['usermail']}','{data['affliation']}','{data['affliationType']}', \
                                    '{data['job']}')"
            self.psql_cur.execute(query)
            self.psql_conn.commit()
        except Exception as err:
            self.logger.debug("%s",query)
            self.logger.error("%s",err)
        if not self.insert_user_credentials(data['usermail'],data['password']):
            return "User already exists"
        return "New user added to database"

    def check_if_user_exists(self, email:str)->bool:
        """Checks if user already exists

        Args:
            email (str): email id of user

        Returns:
            flag (bool): True if user exists else false
        """
        query =f"select * from users where email = '{email}'"
        data = self.fetch_data(query)
        if len(data)>0:
            return True
        else:
            return False

    def insert_user_credentials(self, email:str, password:str)->bool:
        """Inserts new users email and password

        Args:
            email (str): email id of user
            password (str): password of user

        Returns:
            bool: success/fail message
        """
        if self.check_user_credentials(email,password):
            return False
        try:
            query = f"insert into credentials(EMAIL,PASSWORD) values ('{email}','{password}')"
            self.psql_cur.execute(query)
            self.psql_conn.commit()
        except Exception as err:
            self.logger.debug("%s",query)
            self.logger.error("%s",err)
        return True
    
    def check_user_credentials(self, email:str, password:str)->str:
        """checks users email and password exists in database

        Args:
            email (str): email id of user
            password (str): password of user

        Returns:
            message (str): success/fail message
        """
        query =f"select * from credentials where email = '{email}' and password = '{password}'"
        data = self.fetch_data(query)
        if len(data)>0:
            return True
        else:
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