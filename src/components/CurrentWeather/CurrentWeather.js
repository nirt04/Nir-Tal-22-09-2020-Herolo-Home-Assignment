import React from "react";
import current_weather from "../../data/current_weather.json";
import { makeStyles } from "@material-ui/core/styles";
import appConfigActions from "../../App/actions"
import { accuweatherAPI } from "../../services/API/accuweather";
import { connect } from "react-redux";
import { Box, Button, CardMedia, Divider } from "@material-ui/core";
import moment from "moment";

const useStyles = makeStyles({
  tempUnitBtn: {
    minWidth: "unset",
  },
  media: {
    // margin: "auto",
    width: "85px",
    height: "85px",
  },
});

function CurrentWeather(props) {
  const [currentWeather, setCurrentWeather] = React.useState(null);
  // const [props.appConfig.tempratureUnit, setTemperatureUnit] = React.useState("Metric");
  const classes = useStyles();

  const dataInit = async (locationId) => {
    if (!locationId) return;

    const currentWeather =
      current_weather ||
      props.currentWeather[locationId] ||
      (await accuweatherAPI.currentWeather(locationId));
    setCurrentWeather(currentWeather);
    props.dispatchCurrentWeather({ [props.locationId]: currentWeather });
  };

  React.useEffect(() => {
    console.log("currentWeather key change", props.currentWeather.info.key);
    dataInit(props.currentWeather.info.key);
  }, [props.currentWeather.info.key]);

  debugger;
  return (
    <div>
      <h1>{props.currentWeather.info.name}</h1>
      {currentWeather &&
        currentWeather.map((item, i) => (
          <React.Fragment>
            <Box display="flex" justifyContent="center">
              <Button
                onClick={() => props.updateAppConfig({tempratureUnit: "Metric"})}
                color={props.appConfig.tempratureUnit === "Metric" ? "primary" : undefined}
                className={classes.tempUnitBtn}
              >
                °C
              </Button>
              <Divider
                orientation="vertical"
                flexItem
                // style={{ margin: "0 10px" }}
                // m={2}
              />
              <Button
                onClick={() => props.updateAppConfig({tempratureUnit: "Imperial"})}
                color={props.appConfig.tempratureUnit === "Imperial" ? "primary" : undefined}
                className={classes.tempUnitBtn}
              >
                °F
              </Button>
            </Box>
            <h1>{item.WeatherText}</h1>
            <h1>
              {" "}
              {moment(item.LocalObservationDateTime).format("dddd")}{" "}
              {moment(item.LocalObservationDateTime).format("HH:MM")}{" "}
            </h1>
            <h1>{Math.floor(item.Temperature[props.appConfig.tempratureUnit].Value)}</h1>
            <CardMedia
              className={classes.media}
              image={`https://developer.accuweather.com/sites/default/files/${item.WeatherIcon.toString().padStart(
                2,
                "0"
              )}-s.png`}
            />
          </React.Fragment>
        ))}

      <h1>hello current_weather </h1>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    currentWeather: state.currentWeather,
    appConfig: state.appConfig,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateAppConfig: (payload) => dispatch(appConfigActions.UPDATE_APP_CONFIG(payload)),
    dispatchCurrentWeather: (payload) => dispatch({ type: "ADD_CURRENT_WEATHER_RESULTS", payload }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentWeather);
