import React from "react";
import { Route, useLocation } from "react-router-dom";
import HeroloAutocomplete from "../../components/HeroloAutocomplete";
import CurrentWeather from "../../modules/CurrentWeather/CurrentWeather";
import FiveDailyForecasts from "../../modules/FiveDailyForecasts/FiveDailyForecasts";
import HTTP from "../../services/HTTP";
import CITEIS_AUTOCOMPLETE_DATA from "../../data/cities_autocomplete.json";
import FIVE_DAYS_DATA from "../../data/5_days_of_daily_forecasts.json"
import currentWeather from "../../data/current_weather.json"
const useQuery = () => { return new URLSearchParams(useLocation().search); };

// function sleep(delay = 0) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, delay);
//   });

export default function Weather(props) {
const query = useQuery();

// DATA

  // Autocomplete State
  const [autocompleteItems, setAutocompleteItems] = React.useState([]);
  const [autocompleteLoading, setAutocompleteLoading] = React.useState(false);
  const [autocompleteValue, setAutocompleteValue] = React.useState(null);
  
  // FiveDaysForecastsItems State
  const [fiveDaysForecastsItems, setFiveDaysForecastsItems] = React.useState([]);

  // CurrentWeatherInfo State
  const [currentWeatherInfo, setCurrentWeatherInfo] = React.useState(null);

  const fetchAutocompleteCities = async (searchQuery, locationId) => {
    if (!searchQuery) return [];
    const cities = await HTTP.get("locations/v1/cities/autocomplete", { language: "en-us", q: searchQuery, });
    return cities;
  };

// On Mounted
  React.useEffect(async () => {
    const searchQuery = query.get("search");
    debugger;

    // Fetching cities for autocomplete with searchQuery in the route if existed

        setAutocompleteLoading(true);
        const cities = CITEIS_AUTOCOMPLETE_DATA || await fetchAutocompleteCities(searchQuery);
        setAutocompleteItems(cities);
        setAutocompleteLoading(false);

    if (props.match.params.locationId) {

    // Fetching 5 Days of Daily Forecasts according to the locationId from the route
        const fiveDaysForecastsItems = FIVE_DAYS_DATA || await HTTP.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${props.match.params.locationId}`, { language: "en-us", details: true, metric: true});
        if(fiveDaysForecastsItems.DailyForecasts) setFiveDaysForecastsItems(fiveDaysForecastsItems.DailyForecasts)

    // If there is locationId in the route we wants to select it from the items we fetched to the autocomplete 
        const itemInAutocompleteOptions = cities.find( (option) => option.Key === props.match.params.locationId );
        if (itemInAutocompleteOptions) setAutocompleteValue(itemInAutocompleteOptions);
    }
  }, []);


// Render  
  return (
    <React.Fragment>
      <Route
        render={({ history }) => (
          <HeroloAutocomplete
            getOptionSelected={(option, value) => option.Key === value.Key}
            onChange={(event, newVal) => {
              history.push({
                pathname: `/weather/${newVal ? newVal.Key : ""}`,
                search: `${newVal ? newVal.LocalizedName : ""}`,
              });
              setAutocompleteValue(newVal);
            }}
            getOptionLabel={(option) => `${option.LocalizedName}, ${ option.Country ? option.Country.LocalizedName : "" }` }
            value={autocompleteValue}
            options={autocompleteItems}
            loading={autocompleteLoading}
          />
        )}
      />
      <Route
        exact
        path="/weather/:locationId/"
        render={({ match }) => (
          <CurrentWeather locationId={match.params.locationId} />
        )}
      />
      <Route
        exact
        path="/weather/:locationId/"
        render={({ match }) => ( 
          <FiveDailyForecasts items={fiveDaysForecastsItems} />
        )}
      />
    </React.Fragment>
  );
}
