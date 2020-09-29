import { accuweatherAPI } from '../../services/API/accuweather';
import autocompleteDataJson from '../../data/cities_autocomplete.json';

export default {
  SET_AUTOCOMPLETE_DATA_BY_QUERY: (query) => async (dispatch, getState) => {
    const store = getState();
    const autocompleteData =  store.autocomplete.data[query] || await accuweatherAPI.autocompleteCities(query);
    dispatch({ type: 'SET_AUTOCOMPLETE_DATA_BY_QUERY', payload: { [query]: autocompleteData } });
    return autocompleteData;
  },
};
