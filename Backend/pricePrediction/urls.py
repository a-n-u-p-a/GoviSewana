from django.urls import path
from . import views

urlpatterns = [
    path('predictPrice/', views.predict_Display_Prices, name='predict_Display_Prices'),
]