from django.shortcuts import render
from django.http import HttpResponse
from .models import price_collection, excess_collection

from rest_framework.decorators import api_view
from rest_framework.response import Response

import pandas as pd
import datetime
import calendar

# Import python files
import pricePrediction.weatherAPI as wapi
import pricePrediction.prediction_model as pm


@api_view(['POST'])
def predict_Display_Prices(request):
    if request.method == 'POST':
        try:
            userInputs = request.data # Use request.data to get the JSON data
            cropType = userInputs.get("Crop_Type")
            yearMonth = userInputs.get("Year_Month")


            # Split the input values into year and month
            year, numeric_month = yearMonth.split("-")
            # Get the user input month name
            userInputMonth = calendar.month_name[int(numeric_month)]
            
            # Get the today date
            todayDate = datetime.datetime.now()
            # Get the today full month name
            todayMonth = todayDate.strftime("%B")
            # Get the week number using isocalender()
            today_Week_No = todayDate.isocalendar()[1]



            # Retrieve documents where 'field_name' equals a specific value
            getDocument = excess_collection.find({"Crop_Type": cropType, "Week_No": str(today_Week_No)})

            # Iterate through the results
            for doc in getDocument:
                totalExtent = doc.get("Total_Extent")
                totalYield = doc.get("Total_Yield")

            
            weather_data = wapi.processWeatherData()
            rain_sum = weather_data[0]

            #pd dataframe that consists of ml features
            if (cropType == "Potato"):
                average_data = pd.DataFrame ({
                    'yield': [totalYield],
                    'extent': [totalExtent],
                    'rain_sum (mm)': [rain_sum]
                })
            elif (cropType == "Carrot"):
                average_data = pd.DataFrame ({
                    'extent ': [totalExtent],
                    'Yield ': [totalYield],
                    'rain_sum (mm)': [rain_sum]
                })


            # Selecting the required scaler file 
            scaler = pm.selectScaler(cropType)

            # Scaling the prediction input data
            scaled_new_data = pm.scale_data(average_data, scaler)

            # Selecting the required prediction model   
            model = pm.selectPredictionModel(cropType)

            new_predictions = pm.make_predictions(scaled_new_data, model)

            print(new_predictions)

            # Update Predicted price in to Crop_Price collection
            getUpdateDoc = price_collection.find_one_and_update({"Crop_Type": cropType, "Year": year, "Month": todayMonth, "Week_No": str(today_Week_No)}, {"$set": {"Crop_Price": int(new_predictions[0])}}, upsert=True)




            # Retrieve documents where 'field_name' equals a specific value
            getPriceDocuments = price_collection.find({'Crop_Type': cropType, 'Year': year, 'Month': userInputMonth}).sort("Week_No")

            records = {}
            num = 1
            # Iterate through the results
            for priceDoc in getPriceDocuments:
                # Remove the "_id" key (JSON object)
                priceDoc.pop("_id")
                records["Week "+str(num)] = priceDoc.get("Crop_Price")
                print(priceDoc)
                num = num + 1
                
            print(records)
            return Response(records)   
        
        except Exception as e:
            return HttpResponse("error: "+str(e))
