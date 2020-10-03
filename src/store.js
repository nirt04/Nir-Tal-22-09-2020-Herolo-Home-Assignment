import thunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware } from "redux";
import autocompleteReducer from "Views/Weather/components/HeroloAutocomplete/redux/reducer";
import { fiveDayReducer } from "Views/Weather/components/FiveDailyForecasts/redux/reducer";
import { favoritesReducer } from "Views/Favorites/redux/reducer";
import { currentWeatherReducer } from "Views/Weather/components/CurrentWeather/redux/reducer";
import { appConfigReducer } from "App/redux/reducer";
import { errorReducer } from "components/ErrorSnackbar/redux/reducer";

const reducer = combineReducers({
  fiveDay: fiveDayReducer,
  favorites: favoritesReducer,
  currentWeather: currentWeatherReducer,
  autocomplete: autocompleteReducer,
  appConfig: appConfigReducer,
  error: errorReducer,
});

export const store = createStore(reducer, applyMiddleware(thunk));
