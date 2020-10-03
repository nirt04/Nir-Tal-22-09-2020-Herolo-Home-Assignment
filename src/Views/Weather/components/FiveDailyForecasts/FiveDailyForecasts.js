import Box from '@material-ui/core/Box';
import { connect } from 'react-redux';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import ForcastCard from 'Views/Weather/components/FiveDailyForecasts/components/ForcastCard.js';
import { GridContainer } from 'components/GridContainer.js';
import fiveDaysActions from './redux/actions';
import { useStyles } from './style';
import InnerCard from 'components/InnerCard.js';

function DailyForecasts({ match, fiveDay, SET_FIVE_DAY_FETCH_DATA }) {
  const classes = useStyles();
  const { locationId } = match.params;
  const [loading, setLoading] = React.useState(false);
  const [fiveDaysForecastsItems, setFiveDaysForecastsItems] = React.useState(null);

  React.useEffect(() => {
    const dataInit = async () => {
      // Fetching 5 Days of Daily Forecasts according to the locationId from the route, first trying to get data from redux store, if not exsit fetching from the server
      if (!locationId) return;
      setLoading(true);
      const fiveDaysFetch = await SET_FIVE_DAY_FETCH_DATA(locationId);
      if (fiveDaysFetch.DailyForecasts) setFiveDaysForecastsItems(fiveDaysFetch.DailyForecasts);
      setLoading(false);
    };
    dataInit();
  }, [locationId]);
  return (
    <GridContainer>
      <InnerCard>
        <Grid container style={{ padding: '15px' }}>
          <Grid item>
            <Typography variant="h5">Weekly Report</Typography>
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

DailyForecasts.propTypes = {
  SET_FIVE_DAY_FETCH_DATA: PropTypes.func.isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  fiveDay: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => ({
  appConfig: state.appConfig,
  fiveDay: state.fiveDay,
});

const mapDispatchToProps = (dispatch) => ({
  SET_FIVE_DAY_FETCH_DATA: (payload) => dispatch(fiveDaysActions.SET_FIVE_DAY_FETCH_DATA(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DailyForecasts);
