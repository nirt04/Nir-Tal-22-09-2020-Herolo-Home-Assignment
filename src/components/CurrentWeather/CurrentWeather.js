/* prettier-ignore */
import React from 'react';
import {
  Box,
  Button,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import FavoriteIcon from '@material-ui/icons/Favorite';
import appConfigActions from '../../App/actions';
import { useStyles } from './style';
import weatherActions from '../../Views/Weather/actions';
import InnerCard from '../InnerCard';
import favActions from '../../Views/Favorites/actions';

/* prettier-ignore */
function CurrentWeather({
  match,
  location,
  SET_WHEATHER_DATA_BY_KEY,
  APP_CONFIG, CURRENT_WEATHER_STORE,
  UPDATE_APP_CONFIG_STORE,
  FAVORITES_STORE,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
}) {
  const { locationId } = match.params;
  const [loading, setLoading] = React.useState(false);
  const classes = useStyles();

  React.useEffect(() => {
    const dataInit = async () => {
      if (!locationId) return;
      setLoading(true);
      await SET_WHEATHER_DATA_BY_KEY(locationId);
      setLoading(false);
    };
    dataInit(locationId);
  }, [locationId, SET_WHEATHER_DATA_BY_KEY]);

  React.useEffect(() => {
    localStorage.setItem('FAVORITES_STORE', JSON.stringify(FAVORITES_STORE));
  }, [FAVORITES_STORE]);

  const appTempUnit = APP_CONFIG.tempratureUnit;
  const isInFavorite = !!FAVORITES_STORE[CURRENT_WEATHER_STORE.info.name];
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

            <Grid item xs={8}>
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
            <Grid item xs="auto">

              <IconButton
                disableRipple
                className={classes.disableHover}
                variant="contained"
                color={isInFavorite ? 'secondary' : 'default'}
                onClick={() => (
                  isInFavorite
                    ? REMOVE_FAVORITE(CURRENT_WEATHER_STORE.info.name)
                    : ADD_FAVORITE(CURRENT_WEATHER_STORE.info.name, `${location.pathname}${location.search}`))}
              >
                <FavoriteIcon />
                <p className="mx-2">
                  {isInFavorite ? 'Liked' : 'Like'}
                </p>

              </IconButton>
              {/* </Box> */}

            </Grid>
          </Grid>
        ))}
    </InnerCard>
  );
}

CurrentWeather.propTypes = {
  FAVORITES_STORE: PropTypes.objectOf(PropTypes.any).isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  APP_CONFIG: PropTypes.objectOf(PropTypes.any).isRequired,
  CURRENT_WEATHER_STORE: PropTypes.objectOf(PropTypes.any).isRequired,
  SET_WHEATHER_DATA_BY_KEY: PropTypes.func.isRequired,
  UPDATE_APP_CONFIG_STORE: PropTypes.func.isRequired,
  ADD_FAVORITE: PropTypes.func.isRequired,
  REMOVE_FAVORITE: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  CURRENT_WEATHER_STORE: state.currentWeather,
  FAVORITES_STORE: state.favorites,
  APP_CONFIG: state.appConfig,
});

const mapDispatchToProps = (dispatch) => ({
  REMOVE_FAVORITE: (key) => dispatch(favActions.REMOVE_FAVORITE(key)),
  ADD_FAVORITE: (key, data) => dispatch(favActions.ADD_FAVORITE(key, data)),
  UPDATE_APP_CONFIG_STORE: (payload) => dispatch(appConfigActions.UPDATE_APP_CONFIG(payload)),
  SET_WHEATHER_DATA_BY_KEY: (key) => dispatch(weatherActions.SET_WHEATHER_DATA_BY_KEY(key)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrentWeather);
