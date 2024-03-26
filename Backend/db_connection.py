from pymongo import MongoClient

# MongoDB Atlas connection url
url = 'mongodb+srv://GoviSevana:Sdgp_SE-72@cluster0.y9qnhku.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

# Connecting with MongoDB client
client = MongoClient(url)

# Create a "GoviSevana_System" database
db = client['GoviSevana_System']
