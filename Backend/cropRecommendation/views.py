from django.shortcuts import render
from django.http import HttpResponse
from .models import excess_collection

from rest_framework.decorators import api_view
from rest_framework.response import Response

import datetime


@api_view(['GET'])
def displayWeekNo(request):
    try:
        # Get the today date
        todayDateTime = datetime.datetime.now()
        # Add 90 days to the date
        harvest_date = todayDateTime + datetime.timedelta(days=90)
        # Get the week number using isocalender()
        harvest_week_number = harvest_date.isocalendar()[1]

        return Response({"Week_No": harvest_week_number})
        
    except Exception as e:
        return HttpResponse("error: "+str(e))


@api_view(['POST'])
def displayCropData(request):
    # Get the today date
    todayDateTime = datetime.datetime.now()
    # Add 90 days to the date
    harvest_date = todayDateTime + datetime.timedelta(days=90)
    # Get the week number using isocalender()
    harvest_week_number = harvest_date.isocalendar()[1]

    if request.method == 'POST':
        try:
            cropType = request.data.get("Crop_Type")
                
            if (cropType != "BeetRoot"):
                
                getDocument = excess_collection.find({"Crop_Type": cropType, "Week_No": str(harvest_week_number)})
            
                requiredYield = 0
                for doc in getDocument:
                    requiredYield = doc.get("Crop_Demand") - doc.get("Total_Yield")

                    return Response({"Crop_Demand": doc.get("Crop_Demand"), "Current_Yield": doc.get("Total_Yield"), "Required_Yield": requiredYield})
            
            else:
                return Response({"Crop_Demand": 0, "Current_Yield": 0, "Required_Yield": 0})               
                
        except Exception as e:
            return HttpResponse("error: "+str(e))