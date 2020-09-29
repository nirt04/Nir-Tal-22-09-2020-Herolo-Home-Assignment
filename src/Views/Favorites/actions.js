export default {
  ADD_FAVORITE: (key, data) => ({ type: 'ADD_FAVORITE', payload: { key, data } }),
  REMOVE_FAVORITE: (key) => ({ type: 'REMOVE_FAVORITE', payload: { key } }),
};
