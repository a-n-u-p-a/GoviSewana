from django.shortcuts import render
from django.http import HttpResponse
from .models import user_collection

from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['POST'])
def getUserData(request):
    if request.method == 'POST':
        try:
            username = request.data.get("Username")
            # Retrieve documents where 'field_name' equals a specific value
            getDocuments = user_collection.find({"Username": username})

            # Iterate through the results
            for doc in getDocuments:
                # Remove the "_id" key (JSON object)
                doc.pop("_id") 

            return Response(doc)
        
        except Exception as e:
            return HttpResponse("error: "+str(e))
    


@api_view(['POST'])
def updateUserData(request):
    if request.method == 'POST':
        try:
            userInputs = request.data # Use request.data to get the JSON data
            fullName = userInputs.get("Full_Name")
            email = userInputs.get("Email")
            telNo = userInputs.get("Mobile_Number")
            username = userInputs.get("Username")
            
            # print(userInputs)

            updateDoc = user_collection.find_one_and_update({"Username": username}, {"$set": {"Full_Name": fullName, "Email":email, "Mobile_Number":telNo}}, upsert=True)
            # print(updateDoc)

            return HttpResponse("Successfully Updated !")
        
        except Exception as e:
            return HttpResponse("error: "+str(e))