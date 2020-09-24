export const autocompleteReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_SERACH_RESULTS":
      return action.data;
    default:
      return state;
  }
};
