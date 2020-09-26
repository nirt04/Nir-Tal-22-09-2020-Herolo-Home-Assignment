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
import { Box, Card, CardMedia, Container, Typography } from "@material-ui/core";
import InnerCard from "../../components/InnerCard";

function Weather(props) {
  const useStyles = makeStyles((theme) => ({
    favList: {
      maxHeight: "65vh",
      overflowY: "auto",
    },
    outterCard: {
      margin: "0 auto",
      width: "100%",
      maxWidth: "957px",
      //   backgroundColor: theme.palette.outterCard[props.appConfig.themeType],
    },
    weatherTitleIcon: {
      width: "96px",
      height: "100%",
    },

    currentWeatherGrid: {
      padding: "17px",
      height: "max-content",
    },
    root: {
      width: "100%",
      margin: "0 auto",
      maxWidth: "1005px",
    },
  }));

  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.root}>
      <Grid container className={classes.root} spacing={0}>
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
                <InnerCard container>
                  <Grid
                    container
                    xs={12}
                    //   className="px-2"
                    style={{ padding: "15px" }}
                  >
                    <Grid item>
                      <CardMedia
                        className={classes.weatherTitleIcon}
                        image={`https://www.iconfinder.com/data/icons/weather-flat-14/64/weather02-512.png`}
                      />
                    </Grid>
                    <Grid item>
                      <Typography variant="h5">Total Weather Report</Typography>
                      <Typography variant="h5"> some info</Typography>
                    </Grid>
                  </Grid>
                </InnerCard>
              </Grid>
              <Grid item xs={12}>
                <Route
                //   exact
                  path="/weather/:locationId/"
                  component={CurrentWeather}
                />
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
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    appConfig: state.appConfig,
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
