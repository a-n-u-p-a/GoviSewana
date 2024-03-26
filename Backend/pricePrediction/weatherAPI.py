import openmeteo_requests

import requests_cache
import pandas as pd
from retry_requests import retry

# Setup the Open-Meteo API client with cache and retry on error
cache_session = requests_cache.CachedSession('.cache', expire_after = 3600)
retry_session = retry(cache_session, retries = 5, backoff_factor = 0.2)
openmeteo = openmeteo_requests.Client(session = retry_session)

# Make sure all required weather variables are listed here
# The order of variables in hourly or daily is important to assign them correctly below
url = "https://api.open-meteo.com/v1/forecast"
params = {
	"latitude": 6.9708,
	"longitude": 80.7829,
	"daily": ["rain_sum"],
    "forecast_days": 7
}
responses = openmeteo.weather_api(url, params=params)

# Process first location. Add a for-loop for multiple locations or weather models
response = responses[0]

# Process daily data. The order of variables needs to be the same as requested.
daily = response.Daily()

daily_rain_sum = daily.Variables(0).ValuesAsNumpy()

daily_data = {"date": pd.date_range(
    start = pd.to_datetime(daily.Time(), unit = "s", utc = True),
    end = pd.to_datetime(daily.TimeEnd(), unit = "s", utc = True),
    freq = pd.Timedelta(seconds = daily.Interval()),
    inclusive = "left"
)}

daily_data["rain_sum (mm)"] = daily_rain_sum

daily_dataframe = pd.DataFrame(data = daily_data)

def processWeatherData():
    #taking avg and sum values
    data = [
    daily_dataframe["rain_sum (mm)"].sum()
    ]
    return data

