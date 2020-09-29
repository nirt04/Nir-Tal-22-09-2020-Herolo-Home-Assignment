import Box from '@material-ui/core/Box';
import { connect } from 'react-redux';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography } from '@material-ui/core';
import { accuweatherAPI } from '../../services/API/accuweather';
import { actions } from './actions';
import { useStyles } from './style';
import FIVE_DAYS_DATA from '../../data/5_days_of_daily_forecasts.json';
import InnerCard from '../InnerCard';
import ForcastCard from '../ForcastCard/ForcastCard';
import { GridContainer } from '../GridContainer';

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

function DailyForecasts(props) {
  const classes = useStyles();
  const { locationId } = props.match.params;
  const [loading, setLoading] = React.useState(false);
  const [fiveDaysForecastsItems, setFiveDaysForecastsItems] = React.useState(
    null,
  );

  const dataInit = async () => {
    setLoading(true);
    await sleep(1000);
    // Fetching 5 Days of Daily Forecasts according to the locationId from the route, first trying to get data from redux store, if not exsit fetching from the server
    const fiveDaysFetch = FIVE_DAYS_DATA || props.fiveDay[locationId] || (await accuweatherAPI.fiveDays(locationId));
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
    <GridContainer>
      <InnerCard>
        <Grid container style={{ padding: '15px' }}>
          <Grid item>
            <Typography variant="h5">Weekly Report</Typography>
            {/* <Typography variant="h5"> some info</Typography> */}
          </Grid>
        </Grid>
      </InnerCard>
      <InnerCard className={classes.root}>
        {loading ? (
          <Grid item xs="auto">
            <Box
              display="flex"
              justifyContent="center"
              height={177}
              alignItems="center"
            >
              <CircularProgress color="inherit" size={80} />
            </Box>
          </Grid>
        ) : (
          <Grid item xs="auto">
            <Grid container justify="center" direction="row">
              {fiveDaysForecastsItems
                && fiveDaysForecastsItems.map((item, i) => (
                  <Grid key={i} item md="auto" xs="auto" lg="auto">
                    <Box display="flex" justifyContent="center">
                      <ForcastCard item={item} />
                    </Box>
                  </Grid>
                ))}
            </Grid>
          </Grid>
        )}
      </InnerCard>
    </GridContainer>
  );
}

const mapStateToProps = (state) => ({
  appConfig: state.appConfig,
  fiveDay: state.fiveDay,
});

const mapDispatchToProps = (dispatch) => ({
  ADD_FIVE_DAY_FETCH_DATA: (payload) => dispatch(actions.ADD_FIVE_DAY_FETCH_DATA(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DailyForecasts);
