import { accuweatherAPI } from 'services/API/accuweather';

export default {
  SET_CURRENT_WHEATHER_DATA_BY_GEOLOCATION: (lat, lon) => async (dispatch, getState) => {
    const store = getState();
    let locationData; let
      weatherData;
    try {
      locationData = await accuweatherAPI.geopositionSearch(lat, lon);
      weatherData = store.currentWeather.data[locationData.Key] || await accuweatherAPI.currentWeather(locationData.Key);
    } catch (error) {
      return dispatch({ type: 'SET_ERROR', payload: error });
    }
    dispatch({ type: 'SET_CURRENT_WHEATHER_DATA_BY_KEY', payload: { [locationData.Key]: weatherData } });
    dispatch({ type: 'UPDATE_CURRENT_WEATHER_INFO', payload: { name: `${locationData.LocalizedName}${locationData.Country ? `, ${locationData.Country.LocalizedName}` : ''}`, key: locationData.Key } });
    return { weatherData, locationData };
  },

  SET_CURRENT_WHEATHER_DATA_BY_KEY: (key) => async (dispatch, getState) => {
    const store = getState();
    let weatherData;
    try {
      weatherData = store.currentWeather.data[key] || await accuweatherAPI.currentWeather(key);
    } catch (error) {
      return dispatch({ type: 'SET_ERROR', payload: error });
    }
    dispatch({ type: 'SET_CURRENT_WHEATHER_DATA_BY_KEY', payload: { [key]: weatherData } });
    return weatherData;
  },

};
