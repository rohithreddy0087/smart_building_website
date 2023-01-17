"""
Configfile parser
"""
import os
from pathlib import Path
import logging
from configparser import ConfigParser

class ConfigFileparser:
    """
    Parses configfile and stores them in attributes

    Args:
        configfile (str): path to config file
    
    Attributes:
        db_host(str): database host
        db_port(int): database port
        db_name(str): database name
        db_user(str): database username
        db_pass(str): database password
        db_table(str): database table
        logger(logging): logger object
    """
    def __init__(self, configfile = "config.ini"):

        path = Path(__file__)
        ROOT_DIR = path.parent.absolute()
        config_path = os.path.join(ROOT_DIR, configfile)
        parser = ConfigParser()
        parser.read(config_path)
        self.db_host = parser.get('DATABASE','DB_HOST')
        self.db_port = int(parser.get('DATABASE','DB_PORT'))
        self.db_name = parser.get('DATABASE','DB_NAME',fallback="brick")
        self.db_user = parser.get('DATABASE','DB_USER')
        self.db_pass = parser.get('DATABASE','DB_PASS')
        self.db_table = parser.get('DATABASE','DB_TABLE')

        log_formatter = logging.Formatter("%(asctime)s [%(threadName)-12.12s] [%(levelname)-5.5s]  %(message)s")
        self.logger = logging.getLogger('SMART_BUILDING')
        file_handler = logging.FileHandler("smartbuilding_debug.log")
        file_handler.setFormatter(log_formatter)
        self.logger .addHandler(file_handler)

        console_handler = logging.StreamHandler()
        console_handler.setFormatter(log_formatter)
        self.logger .addHandler(console_handler)

        self.logger.setLevel(logging.DEBUG)
def get_config(global_var,configfile="config.ini"):
    """Creates an instance of ConfigFileparser and stores it in the global_var dictionary
    Args:
        global_var (dict): to store all the classes initated
        configfile (str): path to config file

    Returns:
        ConfigFileparser: Instance of ConfigFileparser class
    """
    if "config" not in global_var:
        global_var["config"] = ConfigFileparser(configfile)
    return global_var["config"]