from django.urls import path
from . import views

urlpatterns = [
    path('getUserData/', views.getUserData, name='getUserData'),
    path('updateUserData/', views.updateUserData, name='updateUserData'),
]