import React from "react";
import current_weather from "../../data/current_weather.json";
import { accuweatherAPI } from "../../services/API/accuweather"
import { connect } from "react-redux";

function CurrentWeather(props) {
  const [currentWeather, setCurrentWeather] = React.useState(current_weather);

  const dataInit = async (locationId) => {
    if(!locationId) return;

    const currentWeather = current_weather || props.currentWeather[locationId] || await accuweatherAPI.currentWeather(locationId);
    setCurrentWeather(currentWeather);
    props.dispatchCurrentWeather({[props.locationId]: currentWeather });
  };

  React.useEffect(() => {
    console.log('currentWeather key change',props.currentWeather.info.key)
    dataInit(props.currentWeather.info.key)
  }, [props.currentWeather.info.key]);
  return (
    <div>
      <h1>{props.currentWeather.info.name}</h1>
      <h1>hello current_weather </h1>
    </div>
  );
}


const mapStateToProps = (state) => {
  return {
    currentWeather: state.currentWeather,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchCurrentWeather: (payload) => dispatch({ type: "ADD_CURRENT_WEATHER_RESULTS", payload }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentWeather);

