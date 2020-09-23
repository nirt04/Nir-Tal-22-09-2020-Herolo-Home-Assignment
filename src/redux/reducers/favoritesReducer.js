// a hashmap can be used to fetch a city object from the favorite list in O(1)
// instead of O(n) fetching from an array
export const favoritesReducer = (state = new Map(), action) => {
  switch (action.type) {
    case 'ADD_FAVORITE':
      const a = new Map(state)
      a.set(action.data.name, action.data)
      return a
    case 'REMOVE_FAVORITE':
      const d = new Map(state)
      d.delete(action.data.name)
      return d
    default:
      return state
  }
}