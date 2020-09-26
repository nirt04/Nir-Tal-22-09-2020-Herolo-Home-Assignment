export const appConfigReducer = (
  state = {
    themeType: 'dark',
    tempratureUnit: "Metric",
  },
  action
) => {
  switch (action.type) {
    case "UPDATE_APP_CONFIG":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
