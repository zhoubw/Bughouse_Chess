import pymongo
from pymongo import MongoClient

client = MongoClient()
db = client.manager
users = db.users
board = db.boards


#Login Stuff

def insert(username, password):
    if (not user_exists(username)):
        new_user = {
            "username" : username,
            "password" : password
        }
        users.insert(new_user)
    else:
        print("User exists")
        
def user_exists(username):
    return users.find({"username" : username}).count() > 0





#Game Stuff
