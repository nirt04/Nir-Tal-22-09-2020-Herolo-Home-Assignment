import React from "react";
import { connect } from "react-redux";
import { Route, useLocation } from "react-router-dom";
import HeroloAutocomplete from "../../components/HeroloAutocomplete/HeroloAutocomplete";
import CurrentWeather from "../../components/CurrentWeather/CurrentWeather";
import FiveDailyForecasts from "../../components/FiveDailyForecasts/FiveDailyForecasts";
import HTTP from "../../services/HTTP";
import CITEIS_AUTOCOMPLETE_DATA from "../../data/cities_autocomplete.json";
import FIVE_DAYS_DATA from "../../data/5_days_of_daily_forecasts.json";
import currentWeather from "../../data/current_weather.json";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import WelcomeSearch from "./components/WelcomeSearch";
import { Box, Card, CardMedia, Typography } from "@material-ui/core";

function Weather(props) {
  const useStyles = makeStyles((theme) => ({
    media: {
      // backgroundSize: 'co',
      // margin: "auto",
      width: "96px",
      height: "100%",
    },

    bgs: {
      minHeight: "203px",
      background: "#461EB7",
      padding: "17px",
      "& > *": {
        color: "white",
      },
    },
    currentWeatherReportCard: {
      color: "white",
      width: "100%",
      height: "max-content",
      //   height: "100%",
      //   padding: "10px",
    },
    currentWeatherGrid: {
      background: "#3810AE",
      padding: "17px",
      height: "max-content",
      //   padding: "22px",
    },
    CurrentWeather: {
      //   margin: "20px 0",
    },
    root: {
      // padding: '10px',
      width: "100%",
      marginTop: "17vh",
      margin: "0 auto",
      maxWidth: "1005px",
    },
  }));

  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid container className={classes.root} spacing={5}>
        <Grid item xs={12} md={"6"}>
          <Route component={WelcomeSearch} />
        </Grid>
        <Grid
          item
          xs={12}
          md={"6"}
          //   spacing={3}
          container
          // className={`${classes.currentWeatherGrid}`}
        >
          <Card container className={`${classes.currentWeatherGrid}`}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Grid container>
                  <Card
                    className={`${classes.currentWeatherReportCard} bg-card-primary-0`}
                    container
                  >
                    <Grid
                      container
                      xs={12}
                      // className={classes.bgs}
                      style={{ paddingLeft: "7px", padding: "15px" }}
                    >
                      <Grid item>
                        <CardMedia
                          className={classes.media}
                          image={`https://www.iconfinder.com/data/icons/weather-flat-14/64/weather02-512.png`}
                        />
                      </Grid>
                      <Grid item>
                        <Typography variant="h5">
                          Total Weather Report
                        </Typography>
                        <Typography variant="h5"> some info</Typography>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              </Grid>
              <Grid item xs={12} className={classes.CurrentWeather}>
                <Card className={classes.bgs}>
                  <Route
                    exact
                    path="/weather/:locationId/"
                    component={CurrentWeather}
                  />
                </Card>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Route
            exact
            path="/weather/:locationId/"
            component={FiveDailyForecasts}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    // fiveDay: state.fiveDay,
    // currentWeather: state.currentWeatherReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // dispatchCurrentWeatherInfo: (payload) => dispatch({ type: "UPDATE_CURRENT_WEATHER_INFO", payload }),
    // dispatchFiveDaysData: (payload) => dispatch({ type: "ADD_FIVE_DAY_FETCH_DATA", payload }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Weather);
