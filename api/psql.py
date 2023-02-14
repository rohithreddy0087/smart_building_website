"""
Postgres sql connection to fetch data
"""
from typing import Callable, List, Optional, Dict, Tuple
import re

import numpy as np
import pandas as pd
import psycopg2
from .config_parser import ConfigFileparser


class DataBase:
    """
    Creates Database connection

    Args:
        config (ConfigFileparser): Config file parser Instance

    Attributes:
        config (ConfigFileparser): Config file parser Instance
    """
    def __init__(self,
        config: ConfigFileparser
    ) -> None:
        self.config = config

    def create_psql(self):
        """Creates a Postgres connection

        Returns:
            psql_conn: database connection
            psql_cur: database cursor
        """
        try:
            psql_conn = psycopg2.connect(user = self.config.db_user,
                                    password = self.config.db_pass,
                                    host = self.config.db_host,
                                    port = str(self.config.db_port),
                                    database = self.config.db_name)
            psql_cur = psql_conn.cursor()
        except Exception as err:
            self.config.logger.error(err)
        return psql_conn, psql_cur

    