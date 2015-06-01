import pymongo
from pymongo import MongoClient

client = MongoClient();
db = client.manager;
users = db.users;
board = db.boards;


