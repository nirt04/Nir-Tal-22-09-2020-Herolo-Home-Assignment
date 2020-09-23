export const fiveDayReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_FIVE_DAY':
      return action.data
    default:
      return state
  }
}