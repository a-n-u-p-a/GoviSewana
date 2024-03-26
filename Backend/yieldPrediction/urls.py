from django.urls import path
from . import views

urlpatterns = [
    path('predictor/', views.yieldPredictor, name='predictor'),
    path('excess/', views.excessCalculation, name='excessCalculation'),
    path('delete/', views.deleteRecord, name='deleteRecord'),
]