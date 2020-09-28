import { accuweatherAPI } from "../../services/API/accuweather";
import current_weather from "../../data/current_weather.json"
import {util} from "../../services/util"
export default {
  SET_WHEATHER_DATA_BY_GEOLOCATION: () => {
    return async (dispatch, getState) => {
    // Fetch here
      dispatch({
        type: "SET_WHEATHER_DATA_BY_GEOLOCATION",
        payload: { SET_WHEATHER_DATA_BY_GEOLOCATION: "SET_WHEATHER_DATA_BY_GEOLOCATION" },
      });
    };
  },
  SET_WHEATHER_DATA_BY_KEY: (key) => {
    return async (dispatch, getState) => {
    // Fetch here
    debugger;
    const store = getState()
    const weatherData = current_weather || store.currentWeather.data[key] || await accuweatherAPI.currentWeather(key);
    await	util.sleep(1000)
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
