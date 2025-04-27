import motor.motor_asyncio
from dotenv import load_dotenv
import os

load_dotenv()
client = motor.motor_asyncio.AsyncIOMotorClient(os.getenv("MONGO_URI"))
db = client.get_database('database')
emergencies_collection = db["emergencies"]