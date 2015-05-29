import pymongo
from pymongo import MongoClient

client = MongoClient()
db = client.account_manager
users = db.users
