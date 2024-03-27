from django.urls import path
from . import views

urlpatterns = [
    # path('displayWeekNo/', views.displayWeekNo, name='displayWeekNo'),
    path('displayCropData/', views.displayCropData, name='displayCropData'),
]