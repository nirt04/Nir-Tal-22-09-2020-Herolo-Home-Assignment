/* prettier-ignore */
import React from 'react';
import {
  Box,
  Button,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import appConfigActions from '../../App/actions';
import { useStyles } from './style';
import weatherActions from '../../Views/Weather/actions';
import InnerCard from '../InnerCard';

/* prettier-ignore */
function CurrentWeather({
  match, SET_WHEATHER_DATA_BY_KEY, APP_CONFIG, CURRENT_WEATHER_STORE, UPDATE_APP_CONFIG_STORE,
}) {
  const { locationId } = match.params;
  const [loading, setLoading] = React.useState(false);
  const classes = useStyles();

  const dataInit = async () => {
    if (!locationId) return;
    setLoading(true);
    await SET_WHEATHER_DATA_BY_KEY(locationId);
    setLoading(false);
  };

  React.useEffect(() => {
    dataInit(locationId);
  }, [locationId]);

  const appTempUnit = APP_CONFIG.tempratureUnit;
  const isReady = !loading && APP_CONFIG.isAppReady && CURRENT_WEATHER_STORE.info.name && CURRENT_WEATHER_STORE.data[locationId];
  return (

    <InnerCard className={classes.root}>
      {!isReady && (
        <Box margin="auto">
          <CircularProgress color="inherit" size={75} />
        </Box>
      )}
      {isReady
        && CURRENT_WEATHER_STORE.data[locationId].map((item, i) => (
          <Grid container spacing={3} key={i} style={{ padding: '15px' }}>

            <Grid item xs={12}>
              <Typography variant="subtitle2" className="px-4">

                {CURRENT_WEATHER_STORE.info.name}

              </Typography>
              <Typography variant="subtitle1" className="px-4">
                {moment(item.LocalObservationDateTime).format('dddd')}
                {' '}
                {moment(item.LocalObservationDateTime).format('HH:MM')}
              </Typography>
              <Typography variant="subtitle1" className="px-4">{item.WeatherText}</Typography>
              <Grid
                container
                spacing={2}
                className="px-4"
                style={{ marginTop: 'auto' }}
                alignItems="center"
              >
                <Grid item xs="auto">
                  <CardMedia
                    className={classes.media}
                    image={`https://developer.accuweather.com/sites/default/files/${item.WeatherIcon.toString().padStart(2, '0')}-s.png`}
                  />
                </Grid>
                <Grid item xs="auto">
                  <Box display="flex">
                    <Typography variant="h2" className="pt-1">{Math.floor(item.Temperature[appTempUnit].Value)}</Typography>
                    <Box display="flex" height="max-content">
                      <Button
                        disableRipple
                        style={{ color: appTempUnit === 'Imperial' ? 'grey' : 'white' }}
                        onClick={() => UPDATE_APP_CONFIG_STORE({ tempratureUnit: 'Metric' })}
                        className={classes.tempUnitBtn}
                      >
                        °C
                      </Button>
                      <Divider orientation="vertical" flexItem />
                      <Button
                        disableRipple
                        onClick={() => UPDATE_APP_CONFIG_STORE({ tempratureUnit: 'Imperial' })}
                        style={{ color: appTempUnit === 'Imperial' ? 'white' : 'grey' }}
                        className={classes.tempUnitBtn}
                      >
                        °F
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ))}
    </InnerCard>
  );
}

CurrentWeather.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  SET_WHEATHER_DATA_BY_KEY: PropTypes.func.isRequired,
  UPDATE_APP_CONFIG_STORE: PropTypes.func.isRequired,
  APP_CONFIG: PropTypes.objectOf(PropTypes.any).isRequired,
  CURRENT_WEATHER_STORE: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => ({
  CURRENT_WEATHER_STORE: state.currentWeather,
  APP_CONFIG: state.appConfig,
});

const mapDispatchToProps = (dispatch) => ({
  UPDATE_APP_CONFIG_STORE: (payload) => dispatch(appConfigActions.UPDATE_APP_CONFIG(payload)),
  SET_WHEATHER_DATA_BY_KEY: (key) => dispatch(weatherActions.SET_WHEATHER_DATA_BY_KEY(key)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrentWeather);
