import { accuweatherAPI } from '../../services/API/accuweather';
import currentWeather from '../../data/current_weather.json';

export default {
  SET_WHEATHER_DATA_BY_GEOLOCATION: (lat, lon) => async (dispatch, getState) => {
    // Fetch here
    const store = getState();
    const locationData = await accuweatherAPI.geopositionSearch(lat, lon);
    const weatherData =
   store.currentWeather.data[locationData.Key]
    || await accuweatherAPI.currentWeather(locationData.Key);
    dispatch({ type: 'SET_WHEATHER_DATA_BY_KEY', payload: { [locationData.Key]: weatherData } });
    dispatch({ type: 'UPDATE_CURRENT_WEATHER_INFO', payload: { name: `${locationData.LocalizedName}${locationData.Country ? `, ${locationData.Country.LocalizedName}` : ''}`, key: locationData.Key } });
    return { weatherData, locationData };
  },

  SET_WHEATHER_DATA_BY_KEY: (key) => async (dispatch, getState) => {
    // Fetch here
    const store = getState();
    const weatherData = 
     store.currentWeather.data[key]
    || await accuweatherAPI.currentWeather(key);
    // await util.sleep(1000)
    dispatch({ type: 'SET_WHEATHER_DATA_BY_KEY', payload: { [key]: weatherData } });
    return weatherData;
  },

//   SET_WHEATHER_DATA_BY_KEY: () => {
//     return async () => {
//       return { SET_WHEATHER_DATA_BY_KEY: "SET_WHEATHER_DATA_BY_KEY" };
//       // const geolocationPermission = await navigator.permissions.query({ name: "geolocation" })
//     };
//   },
};
