import { accuweatherAPI } from "../../services/API/accuweather";
import current_weather from "../../data/current_weather.json"
import geopostion_serach_data from "../../data/geopostion_serach_data.json"
import {util} from "../../services/util"
export default {
    SET_WHEATHER_DATA_BY_GEOLOCATION: (lat, lon) => {
        return async (dispatch, getState) => {
          // Fetch here
          const store = getState()
          const locationData = geopostion_serach_data || await accuweatherAPI.geopositionSearch(lat, lon);
          const weatherData =  current_weather || store.currentWeather.data[locationData.Key] || await accuweatherAPI.currentWeather(locationData.Key);
          dispatch({ type: "SET_WHEATHER_DATA_BY_KEY", payload: { [locationData.Key]: weatherData }, });
          dispatch({ type: "UPDATE_CURRENT_WEATHER_INFO", payload: { name: `${locationData.LocalizedName}${locationData.Country ? ", " + locationData.Country.LocalizedName : "" }`, key: locationData.Key }, });
          return { weatherData , locationData }
        };
    },

    SET_WHEATHER_DATA_BY_KEY: (key) => {
    return async (dispatch, getState) => {
    // Fetch here
    const store = getState()
    const weatherData = current_weather|| store.currentWeather.data[key] || await accuweatherAPI.currentWeather(key);
    // await util.sleep(1000)
    dispatch({ type: "SET_WHEATHER_DATA_BY_KEY", payload: { [key]: weatherData }, });
    return weatherData
        };
    },


//   SET_WHEATHER_DATA_BY_KEY: () => {
//     return async () => {
//       return { SET_WHEATHER_DATA_BY_KEY: "SET_WHEATHER_DATA_BY_KEY" };
//       // const geolocationPermission = await navigator.permissions.query({ name: "geolocation" })
//     };
//   },
};
