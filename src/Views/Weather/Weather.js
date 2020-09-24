import React from "react";
import { connect } from "react-redux";
import { Route, useLocation } from "react-router-dom";
import HeroloAutocomplete from "../../components/HeroloAutocomplete";
import CurrentWeather from "../../modules/CurrentWeather/CurrentWeather";
import FiveDailyForecasts from "../../modules/FiveDailyForecasts/FiveDailyForecasts";
import HTTP from "../../services/HTTP";
import CITEIS_AUTOCOMPLETE_DATA from "../../data/cities_autocomplete.json";
import FIVE_DAYS_DATA from "../../data/5_days_of_daily_forecasts.json"
import currentWeather from "../../data/current_weather.json"
const useQuery = () => { return new URLSearchParams(useLocation().search); };


function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

function Weather(props) {
const query = useQuery();

// DATA

  // Autocomplete State
  const [autocompleteLoading, setAutocompleteLoading] = React.useState(false);
  const [autocompleteItems, setAutocompleteItems] = React.useState([]);
  const [autocompleteValue, setAutocompleteValue] = React.useState(null);
  const [autocompleteInput, setAutocompleteInput] = React.useState(null);
  

  // CurrentWeatherInfo State

  const fetchAutocompleteCities = async (searchQuery) => {
    console.log('fetchAutocompleteCities')
        let cities
        setAutocompleteLoading(true);
        await sleep(1000);
        if (!searchQuery) cities = [];
        else cities = CITEIS_AUTOCOMPLETE_DATA || await HTTP.get("locations/v1/cities/autocomplete", { language: "en-us", q: searchQuery, });
        setAutocompleteLoading(false);
        return cities;
  };

  const setNewAutocompleteVal = newVal => {
    setAutocompleteValue(newVal)
    if(!newVal)  {
      props.history.push(`/weather`);
      props.dispatchCurrentWeatherInfo({ name: null , key: null })
      return;
    }
    else {
      props.history.push(`/weather/${newVal.Key}/?search=${newVal.LocalizedName}`);
      props.dispatchCurrentWeatherInfo({ name: `${newVal.LocalizedName}${newVal.Country ? ', ' + newVal.Country.LocalizedName : ''}`, key: newVal.Key })
    }
  }

//   const getCitiesAutocomplete = async (searchQuery) => {
//     const cities = await fetchAutocompleteCities(searchQuery);
//     return cities
// }

const onMountedData = async () =>{
  const searchQuery = query.get("search");
  const cities = await fetchAutocompleteCities(searchQuery)
  setAutocompleteItems(cities);
  if (props.match.params.locationId) {
    // If there is locationId in the route we wants to select it from the items we fetched to the autocomplete 
      const itemInAutocompleteOptions = cities.find( (option) => option.Key === props.match.params.locationId );
      setNewAutocompleteVal(itemInAutocompleteOptions)
    }
}

// On Mounted
  React.useEffect(() => {
    onMountedData()
  }, []);




       
// Hook
function useDebounce(value, delay, callback) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = React.useState(value);
  
  React.useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
        if(callback) callback(value)
      }, delay);

      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );

  return debouncedValue;
}

  useDebounce(autocompleteInput,1000, async () => {
   if(autocompleteInput)  setAutocompleteItems( await fetchAutocompleteCities(autocompleteInput))
  })
// Render  
  return (
    <React.Fragment>
      <Route
        render={({ history }) => (
          <HeroloAutocomplete
            onInputChange={async (event, searchQuery) => {
              // Emiting the function only if input changed came from user typing and not by clicking on of the options
            if(event && event.type === 'change' && searchQuery) setAutocompleteInput(searchQuery)
            }}
            onChange={(event, newVal) => { setNewAutocompleteVal(newVal) }}
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
        render={(url) => ( <CurrentWeather url={url} locationId={props.match.params.locationId} /> )}
      />
      <Route
        exact
        path="/weather/:locationId/"
        render={() => ( <FiveDailyForecasts locationId={props.match.params.locationId} /> )}
      />
    </React.Fragment>
  );
}


const mapStateToProps = (state) => {
  return {
    fiveDay: state.fiveDay,
    currentWeather: state.currentWeatherReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchCurrentWeatherInfo: payload => dispatch({ type: "UPDATE_CURRENT_WEATHER_INFO", payload }),
    dispatchFiveDaysData: payload => dispatch({ type: "ADD_FIVE_DAY", payload }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Weather);
