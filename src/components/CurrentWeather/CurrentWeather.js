/* prettier-ignore */
import React from "react";
import current_weather from "../../data/current_weather.json";
import { accuweatherAPI } from "../../services/API/accuweather";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import { Box, Button, CardMedia, Divider, Grid, Typography, } from "@material-ui/core";
import moment from "moment";
import InnerCard from "../InnerCard.js";
import {util} from "../../services/util"
import appConfigActions from "../../App/actions";
import {useStyles} from "./style"

/* prettier-ignore */
function CurrentWeather(props) {
  const locationId = props.match.params.locationId;
  const [currentWeather, setCurrentWeather] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const classes = useStyles();

  const dataInit = async () => {
	if (!locationId) return;
	setLoading(true)
	const currentWeather = current_weather || props.CURRENT_WEATHER_STORE[locationId] || await accuweatherAPI.currentWeather(locationId);
await	util.sleep(1000)
	setLoading(false)
    setCurrentWeather(currentWeather);
    props.dispatchCurrentWeather({ [locationId]: currentWeather });
  };

  React.useEffect(() => {
    dataInit(props.CURRENT_WEATHER_STORE.info.key);
  }, [props.CURRENT_WEATHER_STORE.info.key]);

  const appTempUnit = props.APP_CONFIG.tempratureUnit;
  const isReady = props.APP_CONFIG.isAppReady && !loading && currentWeather && props.CURRENT_WEATHER_STORE.info.name 
  return (
	
    <InnerCard className={classes.root}>
      {!isReady && (
        <Box margin="auto">
          <CircularProgress color="inherit" size={75} />
        </Box>
      )}
      {isReady &&
        currentWeather.map((item, i) => (
          <Grid container spacing={3} key={i} style={{ padding: "15px" }}>
	
            <Grid item xs={12}>
              <Typography variant="subtitle2" className="px-4"> {props.CURRENT_WEATHER_STORE.info.name} </Typography>
              <Typography variant="subtitle1" className="px-4">{moment(item.LocalObservationDateTime).format("dddd")} {moment(item.LocalObservationDateTime).format("HH:MM")}</Typography>
              <Typography variant="subtitle1" className="px-4">{item.WeatherText}</Typography>
              <Grid
                container
                spacing={2}
                className="px-4"
                style={{ marginTop: "auto" }}
                alignItems="center"
              >
                <Grid item xs={"auto"}>
                  <CardMedia
                    className={classes.media}
                    image={`https://developer.accuweather.com/sites/default/files/${item.WeatherIcon.toString().padStart( 2, "0" )}-s.png`}
                  />
                </Grid>
                <Grid item xs={"auto"}>
                  <Box display="flex">
                    <Typography variant="h2" className="pt-1">{Math.floor(item.Temperature[appTempUnit].Value)}</Typography>
                    <Box display="flex" height="max-content">
                      <Button
                        style={{color: appTempUnit === "Imperial" ? "grey" : "white"}}
                        onClick={() => props.updateAppConfig({ tempratureUnit: "Metric" }) }
                        className={classes.tempUnitBtn}
                      >
                        °C
                      </Button>
                      <Divider orientation="vertical" flexItem />
                      <Button
                        onClick={() => props.updateAppConfig({ tempratureUnit: "Imperial", }) }
                        style={{color: appTempUnit === "Imperial" ? "white" : "grey"}}
                        className={classes.tempUnitBtn}
                      >
                    	°F
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ))}
    </InnerCard>
  );
}

const mapStateToProps = (state) => {
  return {
    CURRENT_WEATHER_STORE: state.currentWeather,
    APP_CONFIG: state.appConfig,
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
