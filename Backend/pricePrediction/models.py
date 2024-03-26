from django.db import models
from db_connection import db

# Create your models here.
price_collection = db['Crop_Prices']
excess_collection = db['Crop_Excess']
