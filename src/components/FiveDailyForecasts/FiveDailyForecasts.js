import ForcastCard from "../ForcastCard/ForcastCard";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import { connect } from "react-redux";
import { accuweatherAPI } from "../../services/API/accuweather";
import React from "react";
import { actions } from "./actions";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

// import days_of_daily_forecasts from "../../data/5_days_of_daily_forecasts.json";
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
  const locationId = props.match.params.locationId
  // FiveDaysForecastsItems State
  const [loading, setLoading] = React.useState(false);
  const [fiveDaysForecastsItems, setFiveDaysForecastsItems] = React.useState(
    null
  );

  const dataInit = async () => {
    setLoading(true);
    await sleep(1000);
    // Fetching 5 Days of Daily Forecasts according to the locationId from the route, first trying to get data from redux store, if not exsit fetching from the server
    const fiveDaysFetch =
      FIVE_DAYS_DATA ||
      props.fiveDay[locationId] ||
      (await accuweatherAPI.fiveDays(locationId));
    if (fiveDaysFetch.DailyForecasts) {
      setFiveDaysForecastsItems(fiveDaysFetch.DailyForecasts);
      props.ADD_FIVE_DAY_FETCH_DATA({
        ...props.fiveDay,
        [locationId]: fiveDaysFetch,
      });
    }
    setLoading(false);
  };
  React.useEffect(() => {
    dataInit();
  }, [locationId]);

  return (
    <Card className={classes.root}>
      {/* <Grid container className={classes.root}> */}
      {loading ? (
        <Grid item xs={"auto"}>
          <Box
            display="flex"
            justifyContent="center"
            height={283}
            alignItems="center"
          >
            <CircularProgress color="inherit" size={80} />
          </Box>
        </Grid>
      ) : (
        <Grid item xs={"auto"}>
          <Grid container justify="center" direction="row">
            {fiveDaysForecastsItems &&
              fiveDaysForecastsItems.map((item, i) => (
                <Grid
                  key={i}
                  item
                  md={"auto"}
                  xs={"auto"}
                  lg={"auto"}
                  className={classes.forecastGridItem}
                >
                  <Box display="flex" justifyContent="center">
                    {/* <CircularProgress color="inherit" size={20} /> */}
                    {/* {i !== 0 && (
                      <Divider
                        orientation="vertical"
                        flexItem
                        style={{ marginRight: "10px" }}
                        m={2}
                      />
                    )} */}
                    <ForcastCard item={item} />
                    {/* <Divider orientation="vertical" /> */}
                  </Box>
                </Grid>
              ))}
          </Grid>
        </Grid>
      )}
      {/* </Grid> */}
    </Card>
  );
}

const mapStateToProps = (state) => {
  return {
    appConfig: state.appConfig,
    fiveDay: state.fiveDay,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ADD_FIVE_DAY_FETCH_DATA: (payload) =>
      dispatch(actions.ADD_FIVE_DAY_FETCH_DATA(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DailyForecasts);
