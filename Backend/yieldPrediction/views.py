from django.shortcuts import render
from .models import yield_collection, excess_collection
from django.http import HttpResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response

import pandas as pd
import datetime

# Import python files
import yieldPrediction.weatherAPI as wapi
import yieldPrediction.prediction_model as pm

@api_view(['POST'])
# Function to make predictions on new data
def yieldPredictor(request):
    if request.method == 'POST':
        try:
            cultivationData = request.data # Use request.data to get the JSON data 
            crop_type = cultivationData.get("Crop_Type")
            date = cultivationData.get("Date_of_Planting")
            recorded_extent = cultivationData.get("crop_Extent(Acres)")
            #recorded_extent = int(cultivationData.get("crop_Extent(Acres)"))

            # Assuming a date variable 'date' in the format 'yyyy-mm-dd'
            start_date = datetime.datetime.strptime(date, "%Y-%m-%d")

            # Add 90 days to the date
            upadate_date = start_date + datetime.timedelta(days=90)
            harvest_date = upadate_date.strftime("%Y-%m-%d")

            #Get the week number using isocalender()
            planting_week_number = start_date.isocalendar().week
            harvest_week_number = upadate_date.isocalendar().week

            weather_data = wapi.processWeatherData()

            average_temperature = weather_data[0]
            daylight_sum = weather_data[1]
            sunshine_sum = weather_data[2]
            rain_sum = weather_data[3]
            average_precipitation = weather_data[4]
            average_radiation = weather_data[5]
            average_evapotranspiration = weather_data[6]

            #pd dataframe that consists of ml features
            average_data = pd.DataFrame ({
                'recorded extent': [recorded_extent],
                'Temperature': [average_temperature],
                'daylight(s)': [daylight_sum],
                'sunshine(s)': [sunshine_sum],
                'rain_sum (mm)': [rain_sum],
                'precipitation_hours (h)': [average_precipitation],
                'shortwave_radiation_sum (MJ/mÂ²)': [average_radiation],
                'et0_fao_evapotranspiration (mm)': [average_evapotranspiration]
            })

            # Selecting the required scaler file 
            scaler = pm.selectScaler(crop_type)

            # Scaling the prediction input data
            scaled_new_data = pm.scale_data(average_data, scaler)

            # Selecting the required prediction model
            model = pm.selectPredictionModel(crop_type)

            if (int(recorded_extent) > 0):
                #print(recorded_extent)
                # Make predictions on the scaled new data
                new_predictions = pm.make_predictions(scaled_new_data, model)
            else:
                recorded_extent = 0
                new_predictions = [0]

            # Add and update data to Json object
            cultivationData["crop_Extent(Acres)"] = float(recorded_extent)
            cultivationData["Planting _Week_No"] = str(planting_week_number)
            cultivationData["Date_of_Harvest"] = harvest_date
            cultivationData["Harvest_Week_No"] = str(harvest_week_number)
            cultivationData["Predicted_Yield(T)"] = new_predictions[0]

            # Insert data in to Crop_Yield collection
            yield_collection.insert_one(cultivationData)
        
            # Sending the predicted yield to the front end
            return Response({"predictedYield": new_predictions[0], "harvestDate": harvest_date, "weekNumber": harvest_week_number})
            #return HttpResponse(new_predictions)
        
        except Exception as e:
            return HttpResponse("error: "+str(e))
        


@api_view(['POST'])
def excessCalculation(request):
    # Get the today date
    todayDateTime = datetime.datetime.now()
    # Add 90 days to the date
    harvest_date = todayDateTime + datetime.timedelta(days=90)
    # Get the week number using isocalender()
    harvest_week_number = harvest_date.isocalendar()[1]

    if request.method == 'POST':
        try:
            cropType = request.data.get("Crop_Type")

            getCropYieldDocuments = yield_collection.find({"Crop_Type": cropType, "Harvest_Week_No": str(harvest_week_number)})
            getCropExcessDoc = excess_collection.find({"Crop_Type": cropType, "Week_No": str(harvest_week_number)})

            for dataExcess in getCropExcessDoc:
                
                totalExtent = 0
                totalYield = 0
                cropDemand = dataExcess.get("Crop_Demand")

                for yieldData in getCropYieldDocuments:
                    totalExtent = totalExtent + yieldData.get("crop_Extent(Acres)")
                    totalYield = totalYield + yieldData.get("Predicted_Yield(T)")
                
                inExcess = totalYield - cropDemand

            updateCropExcessDocument = excess_collection.find_one_and_update({"Crop_Type": cropType, "Week_No": str(harvest_week_number)}, {"$set": {"Total_Extent": totalExtent, "Total_Yield":totalYield, "In_Excess": inExcess}}, upsert=True)


            # Retrieve and Display the Crop excess data
            getCropExcessDocuments = excess_collection.find({"Crop_Type": cropType})  

            records = {}
            for excessData in getCropExcessDocuments:
                # Remove the "_id" key (JSON oblect)
                excessData.pop("_id") 

                if (int(excessData.get("Week_No")) <= harvest_week_number):
                    records["TableRow"+str(excessData.get("Week_No"))] = excessData
                else:
                    break
        
            return Response(records)

        except Exception as e:
            return HttpResponse("error: "+str(e))



@api_view(['POST'])
def deleteRecord(request):
    if request.method == 'POST':
        try:
            inputData = request.data # Use request.data to get the JSON data 
            username = inputData.get("Username")
            cropType = inputData.get("Crop_Type")
            plantingDate = inputData.get("Date_of_Planting")
            cropExtent = inputData.get("crop_Extent(Acres)")

            # print(inputData)

            deleteDocument = yield_collection.find_one_and_delete({"Username": username, "Crop_Type": cropType, "Date_of_Planting": plantingDate, "crop_Extent(Acres)": int(cropExtent)})
            
            if (deleteDocument != None):
                return Response({"message": "Removed successfully !"})     
            else:
                return Response({"message": "Not removed yet !"})   
    
        except Exception as e:
            return HttpResponse("error: "+str(e))
