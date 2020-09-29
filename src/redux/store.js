import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { fiveDayReducer } from './reducers/fiveDayReducer';
import { favoritesReducer } from './reducers/favoritesReducer';
import { currentWeatherReducer } from './reducers/currentWeatherReducer';
import { autocompleteReducer } from './reducers/autocompleteReducer';
import { appConfigReducer } from './reducers/appConfigReducer';
import { errorReducer } from './reducers/errorReducer';

const reducer = combineReducers({
  fiveDay: fiveDayReducer,
  favorites: favoritesReducer,
  currentWeather: currentWeatherReducer,
  autocomplete: autocompleteReducer,
  appConfig: appConfigReducer,
  error: errorReducer,

});

export const store = createStore(reducer, applyMiddleware(thunk));
