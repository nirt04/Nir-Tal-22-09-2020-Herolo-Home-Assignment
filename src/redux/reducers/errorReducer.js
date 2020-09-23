export const errorReducer = (state = { status: false }, action) => {
  switch (action.type) {
    case 'SET_ERROR':
      return action.data
    default:
      return state
  }
}