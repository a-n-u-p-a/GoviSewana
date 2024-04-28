from django.urls import path
from . import views

urlpatterns = [
    path('send_otp/', views.send_otp, name='send_otp'),
    path('verify_otp/', views.verify_otp, name='verify_otp'),
    path('check_email/', views.check_email, name='check_email'),

]
