import React from "react";
import current_weather from "../../data/current_weather.json";
import { makeStyles } from "@material-ui/core/styles";
import appConfigActions from "../../App/actions";
import { accuweatherAPI } from "../../services/API/accuweather";
import { connect } from "react-redux";
import {
  Box,
  Button,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from "@material-ui/core";
import moment from "moment";

const useStyles = makeStyles({
  tempUnitBtn: {
    minWidth: "unset",
    outline: 'none !important'
  },
  media: {
    backgroundSize: "auto",
    // margin: "auto",
    width: "45px",
    height: "45px",
  },
});

function CurrentWeather(props) {
  const locationId = props.match.params.locationId;
  const [currentWeather, setCurrentWeather] = React.useState(null);
  // const [props.appConfig.tempratureUnit, setTemperatureUnit] = React.useState("Metric");
  const classes = useStyles();

  const dataInit = async () => {
    if (!locationId) return;

    const currentWeather =
      current_weather ||
      props.currentWeather[locationId] ||
      (await accuweatherAPI.currentWeather(locationId));
    setCurrentWeather(currentWeather);
    props.dispatchCurrentWeather({ [locationId]: currentWeather });
  };

  React.useEffect(() => {
    console.log("currentWeather key change", props.currentWeather.info.key);
    dataInit(props.currentWeather.info.key);
  }, [props.currentWeather.info.key]);

  return (
    <React.Fragment >
      <Typography variant="h5" className="px-4 pt-4" >
        {props.currentWeather.info.name}
      </Typography>
      {currentWeather &&
        currentWeather.map((item, i) => (
          <React.Fragment key={i}>
            <Box display="flex" justifyContent="center" alignItems="center">
            <Typography variant="h5" className="pt-1 px-2"> {Math.floor( item.Temperature[props.appConfig.tempratureUnit].Value )}
            </Typography>
              <Button
                onClick={() =>
                  props.updateAppConfig({ tempratureUnit: "Metric" })
                }
                color={ props.appConfig.tempratureUnit === "Metric" ? "neutral(2)" : 'secondary' }
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
                onClick={() =>
                  props.updateAppConfig({ tempratureUnit: "Imperial" })
                } color={ props.appConfig.tempratureUnit === "Imperial" ? "neutral(2)" : 'secondary' }
                className={classes.tempUnitBtn}
              >
                °F
              </Button>
            </Box>
            <Typography variant="h5" className="px-4"  >
              {item.WeatherText}
            </Typography>

            <Typography variant="h5" className="px-4"  >
              {" "}
              {moment(item.LocalObservationDateTime).format("dddd")}{" "}
              {moment(item.LocalObservationDateTime).format("HH:MM")}{" "}
            </Typography>

            <CardMedia
              className={classes.media}
              image={`https://developer.accuweather.com/sites/default/files/${item.WeatherIcon.toString().padStart(
                2,
                "0"
              )}-s.png`}
            />
          </React.Fragment>
        ))}

      <Typography variant="h5" className="px-4"  >hello current_weather </Typography>
    </React.Fragment>
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
    updateAppConfig: (payload) =>
      dispatch(appConfigActions.UPDATE_APP_CONFIG(payload)),
    dispatchCurrentWeather: (payload) =>
      dispatch({ type: "ADD_CURRENT_WEATHER_RESULTS", payload }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentWeather);
