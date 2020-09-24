import ForcastCard from "./components/ForcastCard";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import { connect } from "react-redux";
import { accuweatherAPI } from "../../services/API/accuweather";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

import days_of_daily_forecasts from "../../data/5_days_of_daily_forecasts.json";
import FIVE_DAYS_DATA from "../../data/5_days_of_daily_forecasts.json";

const useStyles = makeStyles((theme) => ({
  forecastGridItem: {
    // marginRight: "10px",
    // margin: "10px",
  },

  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

function DailyForecasts(props) {
  const classes = useStyles();

  // FiveDaysForecastsItems State
  const [loading, setLoading] = React.useState(false);
  const [fiveDaysForecastsItems, setFiveDaysForecastsItems] = React.useState(
    null
  );

  const dataInit = async () => {
    setLoading(true)
    await sleep(1000);
    // Fetching 5 Days of Daily Forecasts according to the locationId from the route, first trying to get data from redux store, if not exsit fetching from the server
    const fiveDaysFetch = FIVE_DAYS_DATA || props.fiveDay[props.locationId] || (await accuweatherAPI.fiveDays(props.locationId));
    if (fiveDaysFetch.DailyForecasts) {
      setFiveDaysForecastsItems(fiveDaysFetch.DailyForecasts);
      props.setFiveDaysToReduxStore({ ...props.fiveDay, [props.locationId]: fiveDaysFetch, });
    }
    setLoading(false)
  };
  React.useEffect(() => {
    dataInit();
  }, [props.locationId]);

  return (
    <Grid container className={classes.root}>
      {loading ? (
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center" height={283} alignItems="center">
            <CircularProgress color="inherit" size={80} />
          </Box>
        </Grid>
      ) : (
        <Grid item xs={12}>
          <Grid container justify="center" direction="row">
            {fiveDaysForecastsItems &&
              fiveDaysForecastsItems.map((item, i) => (
                <Grid
                  key={i}
                  item
                  md={"auto"}
                  xs={12}
                  lg={"auto"}
                  className={classes.forecastGridItem}
                >
                  <Box display="flex" justifyContent="center">
                    {/* <CircularProgress color="inherit" size={20} /> */}
                    {i !== 0 && (
                      <Divider
                        orientation="vertical"
                        flexItem
                        style={{ marginRight: "10px" }}
                        m={2}
                      />
                    )}
                    <ForcastCard item={item} />
                    {/* <Divider orientation="vertical" /> */}
                  </Box>
                </Grid>
              ))}
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    fiveDay: state.fiveDay,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setFiveDaysToReduxStore: (payload) =>
      dispatch({ type: "ADD_FIVE_DAY", payload }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DailyForecasts);
