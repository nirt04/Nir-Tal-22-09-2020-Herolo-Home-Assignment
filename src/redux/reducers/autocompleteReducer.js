export const autocompleteReducer = (
  state = {
    data: {},
  },
  action
) => {
  switch (action.type) {
    case "SET_AUTOCOMPLETE_DATA_BY_QUERY":
      return { ...state, data: { ...state.data, ...action.payload } };
    default:
      return state;
  }
};
