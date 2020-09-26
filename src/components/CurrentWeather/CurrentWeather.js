import React from "react";
import current_weather from "../../data/current_weather.json";
import { makeStyles } from "@material-ui/core/styles";
import appConfigActions from "../../App/actions";
import { accuweatherAPI } from "../../services/API/accuweather";
import { connect } from "react-redux";
import {
  Box,
  Button,
  Card,
  CardMedia,
  Container,
  Divider,
  Grid,
  Typography,
} from "@material-ui/core";
import moment from "moment";
import InnerCard from "../InnerCard.js";

const useStyles = makeStyles({
  tempUnitBtn: {
    paddingTop: "12px",
    minWidth: "unset",
    outline: "none !important",
    "&:hover": {
      backgroundColor: "#461eb7 !important",
    },
  },
  media: {
    backgroundSize: "auto",
    // margin: "auto",
    width: "45px",
    height: "45px",
  },
  root: {
	  minWidth: '444px',
	  minHeight: '191px'
  }
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
  const appTempUnit = props.appConfig.tempratureUnit;
  return (
    //   <InnerCard></InnerCard>
    <InnerCard className={classes.root}>
      {currentWeather &&
        props.currentWeather.info.name &&
        currentWeather.map((item, i) => (
          <Grid container spacing={3} key={i} style={{ padding: "15px" }}>
            <Grid item xs={12}>
              <Typography variant="subtitle2" className="px-4">
                {" "}
                {props.currentWeather.info.name}{" "}
              </Typography>
              <Typography variant="subtitle1" className="px-4">
                {" "}
                {moment(item.LocalObservationDateTime).format("dddd")}{" "}
                {moment(item.LocalObservationDateTime).format("HH:MM")}{" "}
              </Typography>
              <Typography variant="subtitle1" className="px-4">
                {" "}
                {item.WeatherText}{" "}
              </Typography>
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
                    image={`https://developer.accuweather.com/sites/default/files/${item.WeatherIcon.toString().padStart(
                      2,
                      "0"
                    )}-s.png`}
                  />
                </Grid>
                <Grid item xs={"auto"}>
                  <Box display="flex">
                    <Typography variant="h2" className="pt-1">
                      {" "}
                      {Math.floor(item.Temperature[appTempUnit].Value)}{" "}
                    </Typography>
                    <Box display="flex" height="max-content">
                      <Button
                        onClick={() =>
                          props.updateAppConfig({ tempratureUnit: "Metric" })
                        }
                        color={
                          appTempUnit === "Metric" ? "neutral(2)" : "secondary"
                        }
                        className={classes.tempUnitBtn}
                      >
                        {" "}
                        °C{" "}
                      </Button>
                      <Divider orientation="vertical" flexItem />
                      <Button
                        onClick={() =>
                          props.updateAppConfig({
                            tempratureUnit: "Imperial",
                          })
                        }
                        color={
                          appTempUnit === "Imperial"
                            ? "neutral(2)"
                            : "secondary"
                        }
                        className={classes.tempUnitBtn}
                      >
                        {" "}
                        °F{" "}
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            {/* <Grid item xs={6}>
                <h1>hello placeholder</h1>
              </Grid> */}
          </Grid>
        ))}
    </InnerCard>
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
