from django.conf import settings
from twilio.rest import Client
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import user_collection


client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)

@api_view(['POST'])
def register_details(request):
  if request.method == "POST":
    registration_data = request.data
    Email = registration_data.get("Email")
    Password = registration_data.get("Password")
    phone_number = registration_data.get("Mobile_Number")
    username = registration_data.get("Username")

    # Check if a user with the given mobile number already exists
    phone_number = str(phone_number)
    # Prepare two versions of the phone number
    if phone_number.startswith('+94') and not phone_number.startswith('+940'):
      phone_number_alt = phone_number.replace('+94', '+940', 1)
      print(phone_number_alt)
    elif phone_number.startswith('+940'):
      phone_number_alt = phone_number.replace('+940', '+94', 1)
      print(phone_number_alt)

    if 'Email' in registration_data:
      # Update the query to look for either version of the phone number
      existing_number = user_collection.find_one({
          "$or": [
              {"Mobile_Number": phone_number},
              {"Mobile_Number": phone_number_alt}
          ]
      })
      existing_Email = user_collection.find_one({"Email": Email})
      if existing_number or existing_Email:
        print('user already exists')
        # If a user exists, return a response indicating the user is already registered
        return Response(status=409, data={'message': 'User is already registered'})


      # If no existing user is found, sends the otp(has been commented since twilio account is a trial version)

      # verification = client.verify.v2.services(settings.TWILIO_VERIFY_SERVICE_ID) \
      #     .verifications \
      #     .create(to=phone_number, channel='sms')

      regData ={
          "Username" : registration_data.get("Username"),
          "Mobile_Number" : registration_data.get("Mobile_Number"),
          "Full_Name" : registration_data.get("Full_Name"),
          "Email" : registration_data.get("Email"),
          "Password" : registration_data.get("Password"),
        }
      
      user_collection.insert_one(regData)
      # print(verification_check.status)
      return Response(status=200, data={'message': 'User registered successfully', 'Username': username}) 
    else:
      verification = client.verify.v2.services(settings.TWILIO_VERIFY_SERVICE_ID) \
          .verifications \
          .create(to=phone_number, channel='sms')
      return Response(status=200, data={'message': 'OTP resend successfull'})


