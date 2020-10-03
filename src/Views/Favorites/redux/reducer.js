export const favoritesReducer = (state = localStorage.getItem('FAVORITES_STORE') ? JSON.parse(localStorage.getItem('FAVORITES_STORE')) : {}, action) => {
  switch (action.type) {
    case 'ADD_FAVORITE':
      state[action.payload.key] = action.payload.data;
      return { ...state };
    case 'REMOVE_FAVORITE':
      delete state[action.payload.key];
      return { ...state };
    default:
      return state;
  }
};
