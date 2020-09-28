export const favoritesReducer = (state = new Map(), action) => {
  switch (action.type) {
    case "ADD_favorites":
      const a = new Map(state);
      a.set(action.data.name, action.data);
      return a;
    case "REMOVE_favorites":
      const d = new Map(state);
      d.delete(action.data.name);
      return d;
    default:
      return state;
  }
};
