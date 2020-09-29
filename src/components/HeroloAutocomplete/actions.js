import { accuweatherAPI } from '../../services/API/accuweather';
import autocompleteDataJson from '../../data/cities_autocomplete.json';

export default {
  SET_AUTOCOMPLETE_DATA_BY_QUERY: (query) => async (dispatch, getState) => {
    const store = getState();
    let autocompleteData;
    try {
      autocompleteData = store.autocomplete.data[query] || await accuweatherAPI.autocompleteCities(query);
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error });
    }
    dispatch({ type: 'SET_AUTOCOMPLETE_DATA_BY_QUERY', payload: { [query]: autocompleteData } });
    return autocompleteData;
  },
};
