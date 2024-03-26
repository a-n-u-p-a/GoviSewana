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
	"daily": ["apparent_temperature_max", "apparent_temperature_min", "daylight_duration", "sunshine_duration", "rain_sum", "precipitation_hours", "shortwave_radiation_sum", "et0_fao_evapotranspiration"],
    "forecast_days": 7
}
responses = openmeteo.weather_api(url, params=params)

# Process first location. Add a for-loop for multiple locations or weather models
response = responses[0]

# Process daily data. The order of variables needs to be the same as requested.
daily = response.Daily()

daily_apparent_temperature_max = daily.Variables(0).ValuesAsNumpy()
daily_apparent_temperature_min = daily.Variables(1).ValuesAsNumpy()
daily_daylight_duration = daily.Variables(2).ValuesAsNumpy()
daily_sunshine_duration = daily.Variables(3).ValuesAsNumpy()
daily_rain_sum = daily.Variables(4).ValuesAsNumpy()
daily_precipitation_hours = daily.Variables(5).ValuesAsNumpy()
daily_shortwave_radiation_sum = daily.Variables(6).ValuesAsNumpy()
daily_et0_fao_evapotranspiration = daily.Variables(7).ValuesAsNumpy()

daily_data = {"date": pd.date_range(
    start = pd.to_datetime(daily.Time(), unit = "s", utc = True),
    end = pd.to_datetime(daily.TimeEnd(), unit = "s", utc = True),
    freq = pd.Timedelta(seconds = daily.Interval()),
    inclusive = "left"
)}

daily_data["Temperature"] = (daily_apparent_temperature_max + daily_apparent_temperature_min)/2
daily_data["daylight(s)"] = daily_daylight_duration
daily_data["sunshine(s)"] = daily_sunshine_duration
daily_data["rain_sum (mm)"] = daily_rain_sum
daily_data["precipitation_hours (h)"] = daily_precipitation_hours
daily_data["shortwave_radiation_sum (MJ/mÂ²)"] = daily_shortwave_radiation_sum
daily_data["et0_fao_evapotranspiration (mm)"] = daily_et0_fao_evapotranspiration

daily_dataframe = pd.DataFrame(data = daily_data)

def processWeatherData():
    #taking avg and sum values
    data = [
    daily_dataframe["Temperature"].mean(),
    daily_dataframe["daylight(s)"].sum(),
    daily_dataframe["sunshine(s)"].sum(),
    daily_dataframe["rain_sum (mm)"].sum(),
    daily_dataframe["precipitation_hours (h)"].mean(),
    daily_dataframe["shortwave_radiation_sum (MJ/mÂ²)"].mean(),
    daily_dataframe["et0_fao_evapotranspiration (mm)"].mean()
    ]
    return data

