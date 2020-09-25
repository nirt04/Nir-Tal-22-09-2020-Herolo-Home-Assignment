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

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "900px",
  },
}));

function Weather(props) {

  const useStyles = makeStyles((theme) => ({
    root: {
      
      margin: '20px auto',
      maxWidth: "994px",
    },
  }));
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid container spacing={3} className={classes.root}>
        <Grid item xs={12}>
          <Route component={HeroloAutocomplete}/>
        </Grid>
        <Grid item xs={12}>
          <Route
            exact
            path="/weather/:locationId/"
            component={CurrentWeather}
          />
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
