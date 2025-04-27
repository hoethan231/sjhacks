from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
import os

load_dotenv()
client = MongoClient(os.getenv("MONGO_URI"))
db = client.get_database('database')
emergencies_collection = db["emergencies"]