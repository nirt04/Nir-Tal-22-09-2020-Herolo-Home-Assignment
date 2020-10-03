export const currentWeatherReducer = (
  state = {
    data: {},
    info: {
      name: null,
      key: null,
    },
  },
  action,
) => {
  switch (action.type) {
    case 'SET_CURRENT_WHEATHER_DATA_BY_GEOLOCATION':
      return { ...state, data: { ...state.data, ...action.payload } };
    case 'SET_CURRENT_WHEATHER_DATA_BY_KEY':
      return { ...state, data: { ...state.data, ...action.payload } };
    case 'UPDATE_CURRENT_WEATHER_INFO':
      return { ...state, info: { ...state.info, ...action.payload } };
    default:
      return state;
  }
};
