import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { CardMedia, Container, Typography } from '@material-ui/core';
import CurrentWeather from '../../components/CurrentWeather/CurrentWeather';
import FiveDailyForecasts from '../../components/FiveDailyForecasts/FiveDailyForecasts';
import WelcomeSearch from './components/WelcomeSearch';
import InnerCard from '../../components/InnerCard';
import { GridContainer } from '../../components/GridContainer';

function Weather() {
  const useStyles = makeStyles(() => ({
    weatherTitleIcon: {
      width: '40px',
      height: '100%',
      marginRight: '10px',
    },
    root: {
      width: '100%',
      margin: '0 auto',
      maxWidth: '1060px',
    },
  }));

  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.root}>
      <Grid container className={classes.root} spacing={3}>
        <Grid item xs={12} md={6}>
          <Route component={WelcomeSearch} />
        </Grid>
        <Grid item xs={12} md={6}>
          <GridContainer>
            <InnerCard>
              <Grid container style={{ padding: '15px' }}>
                <Grid item>
                  <CardMedia
                    className={classes.weatherTitleIcon}
                    image="https://www.iconfinder.com/data/icons/weather-flat-14/64/weather02-512.png"
                  />
                </Grid>
                <Grid item>
                  <Typography variant="h5">Total Weather Report</Typography>
                </Grid>
              </Grid>
            </InnerCard>
            <Route
              path="/weather/:locationId?/"
              component={CurrentWeather}
            />
          </GridContainer>
        </Grid>
        <Grid item xs={12}>
          <Route
            path="/weather/:locationId?/"
            component={FiveDailyForecasts}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  appConfig: state.appConfig,
});

export default connect(mapStateToProps)(Weather);
