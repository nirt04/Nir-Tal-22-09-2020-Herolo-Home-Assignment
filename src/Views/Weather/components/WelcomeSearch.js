import {
  Box, Button, Grid, Typography,
} from '@material-ui/core';
import React from 'react';
import { Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import geolocation from 'geolocation';
import { connect } from 'react-redux';
import HeroloAutocomplete from '../../../components/HeroloAutocomplete/HeroloAutocomplete';
import weatherActions from '../actions';

const useStyles = makeStyles((theme) => ({
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

function WelcomeSearch(props) {
  const classes = useStyles();

  const handleLocateMeButton = async () => {
    geolocation.getCurrentPosition(async (err, position) => {
      if (err) throw err;
      const data = await props.SET_WHEATHER_DATA_BY_GEOLOCATION(position.coords.latitude, position.coords.longitude);
      props.history.push(`/weather/${data.locationData.Key}/?search=${data.locationData.LocalizedName}`);
      // props.history.push(`/weather/${newVal.Key}/?search=${newVal.LocalizedName}` );
    });
  };
  /* prettier-ignore */
  return (
    <Grid container className={classes.root}>

      <Grid item xs={12}>
        <Typography color="textPrimary" variant="h4" gutterBottom>
          Hello there Herolo.
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography color="textPrimary" variant="h4" gutterBottom>
          Welcome to my weather application.
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography color="textPrimary" m={2} variant="subtitle2" gutterBottom>
          Yet too often some very human cultural artifacts really lead the
          business down the certain routes.
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

const mapStateToProps = (state) => ({ });

const mapDispatchToProps = (dispatch) => ({
  SET_WHEATHER_DATA_BY_GEOLOCATION: (lat, lon) => dispatch(weatherActions.SET_WHEATHER_DATA_BY_GEOLOCATION(lat, lon)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeSearch);
