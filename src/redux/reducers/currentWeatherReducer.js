export const currentWeatherReducer = (
  state = {
    data: {},
    info: {
        name: null,
        key: null,
    }
  },
  action
) => {
  switch (action.type) {
    case "ADD_CURRENT_WEATHER_RESULTS":
      return { ...state, data: { ...state.data, ...action.payload } };
    case "UPDATE_CURRENT_WEATHER_INFO":
      return { ...state, info: { ...state.info, ...action.payload } };
    default:
      return state;
  }
};
