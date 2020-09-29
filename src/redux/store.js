import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { fiveDayReducer } from './reducers/fiveDayReducer';
import { favoritesReducer } from './reducers/favoritesReducer';
import { currentWeatherReducer } from './reducers/currentWeatherReducer';
import { autocompleteReducer } from './reducers/autocompleteReducer';
import { appConfigReducer } from './reducers/appConfigReducer';

const reducer = combineReducers({
  fiveDay: fiveDayReducer,
  favorites: favoritesReducer,
  currentWeather: currentWeatherReducer,
  autocomplete: autocompleteReducer,
  appConfig: appConfigReducer,

});

export const store = createStore(reducer, applyMiddleware(thunk));
