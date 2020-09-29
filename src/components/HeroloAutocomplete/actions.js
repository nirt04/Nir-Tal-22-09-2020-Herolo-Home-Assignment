import { accuweatherAPI } from '../../services/API/accuweather';
import autocompleteDataJson from '../../data/cities_autocomplete.json';

export default {
  SET_AUTOCOMPLETE_DATA_BY_QUERY: (query) => async (dispatch, getState) => {
    // Fetch here
    const store = getState();
    const autocompleteData =  store.autocomplete.data[query] || await accuweatherAPI.autocompleteCities(query);
    // await util.sleep(1000)
    dispatch({ type: 'SET_AUTOCOMPLETE_DATA_BY_QUERY', payload: { [query]: autocompleteData } });
    return autocompleteData;
  },
//   SET_WHEATHER_DATA_BY_KEY: () => {
//     return async () => {
//       return { SET_WHEATHER_DATA_BY_KEY: "SET_WHEATHER_DATA_BY_KEY" };
//       // const geolocationPermission = await navigator.permissions.query({ name: "geolocation" })
//     };
//   },
};
