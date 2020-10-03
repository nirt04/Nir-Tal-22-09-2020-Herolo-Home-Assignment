import {
  Box, Button, Grid, Typography,
} from '@material-ui/core';
import React from 'react';
import { Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import geolocation from 'geolocation';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HeroloAutocomplete from './HeroloAutocomplete/HeroloAutocomplete';
import weatherActions from './CurrentWeather/actions';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
  },
  locateMeButton: {
    backgroundColor: '#0069d9',
    outline: 'none',
    '&:focus': {
      outline: 'none',
    },
  },
  autocomplete: {
    flexGrow: '1',
  },
}));

function WelcomeSearch({ history, SET_CURRENT_WHEATHER_DATA_BY_GEOLOCATION }) {
  const classes = useStyles();

  const handleLocateMeButton = async () => {
    geolocation.getCurrentPosition(async (err, position) => {
      if (err) throw err;
      const data = await SET_CURRENT_WHEATHER_DATA_BY_GEOLOCATION(position.coords.latitude, position.coords.longitude);
      if (data && data.locationData) history.push(`/weather/${data.locationData.Key}/?search=${data.locationData.LocalizedName}`);
      // history.push(`/weather/${newVal.Key}/?search=${newVal.LocalizedName}` );
    });
  };
  /* prettier-ignore */
  return (
    <Grid container className={classes.root}>

      <Grid item xs={12}>
        <Typography color="textPrimary" variant="h4">
          Hello there Herolo.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography color="textPrimary" variant="h5" gutterBottom>
          Welcome to my weather application.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography color="textPrimary" m={2} variant="subtitle2" gutterBottom>
          The Application is Fully responsive,Fully Route integrated, Local Storaged, State Mangement, Uses Axios cancel tokens for preventing old async fetch calls that can override the data, auto Geolocation if possible, and autocomplete with 1000ms debounce. And featured with Dark/Light mode theme. I had great time making it for you.
        </Typography>
        <Typography color="textPrimary" m={2} variant="subtitle2" gutterBottom>
          Thanks for your time and Hope you will enjoy :)
          {' '}
        </Typography>
      </Grid>
      <Grid item xs={12} style={{ marginTop: 'auto' }}>
        <Grid container spacing={2}>

          <Grid item xs={12} md={12} lg="auto" className={classes.autocomplete}>
            <Route component={HeroloAutocomplete} />
          </Grid>
          <Grid item xs={12} md={12} lg="auto">
            <Box display="flex" height="100%">
              <Button color="primary" variant="contained" className={classes.locateMeButton} onClick={handleLocateMeButton}> Locate Me </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

WelcomeSearch.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  SET_CURRENT_WHEATHER_DATA_BY_GEOLOCATION: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  SET_CURRENT_WHEATHER_DATA_BY_GEOLOCATION: (lat, lon) => dispatch(weatherActions.SET_CURRENT_WHEATHER_DATA_BY_GEOLOCATION(lat, lon)),
});

export default connect(null, mapDispatchToProps)(WelcomeSearch);
