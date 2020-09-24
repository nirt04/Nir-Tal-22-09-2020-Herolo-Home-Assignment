export const fiveDayReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_FIVE_DAY":
      return action.payload;
    default:
      return state;
  }
};
