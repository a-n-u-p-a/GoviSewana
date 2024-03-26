from django.urls import path
from . import views

urlpatterns = [

    path('register_details/', views.register_details, name='register_details'),

]
