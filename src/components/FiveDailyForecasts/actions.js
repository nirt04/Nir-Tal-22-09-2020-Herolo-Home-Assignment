import { accuweatherAPI } from '../../services/API/accuweather';

export default {
  SET_FIVE_DAY_FETCH_DATA: (locationId) => async (dispatch, getState) => {
    const store = getState();
    let fiveDaysFetch;
    try {
      fiveDaysFetch = store.fiveDay[locationId] || await accuweatherAPI.fiveDays(locationId);
    } catch (error) {
      return dispatch({ type: 'SET_ERROR', payload: error });
    }
    dispatch({ type: 'SET_FIVE_DAY_FETCH_DATA', payload: { [locationId]: fiveDaysFetch } });
    return fiveDaysFetch;
  },
};
