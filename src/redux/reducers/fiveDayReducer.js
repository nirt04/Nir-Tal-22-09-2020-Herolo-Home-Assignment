export const fiveDayReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_FIVE_DAY_FETCH_DATA":
      return action.payload;
    default:
      return state;
  }
};
