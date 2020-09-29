import React from 'react';
import {
  Switch, Route, useLocation, Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { Container } from '@material-ui/core';
import geolocation from 'geolocation';
import PropTypes from 'prop-types';
import { useStyles } from './style';
import HeroloTabs from '../components/HeroloTabs/HeroloTabs';
import Weather from '../Views/Weather/Weather';
import Favorites from '../Views/Favorites/Favorites';
import appConfigActions from './actions';
import weatherActions from '../Views/Weather/actions';

const useQuery = () => new URLSearchParams(useLocation().search);

export const AppRouter = ({
  match, history, SET_WHEATHER_DATA_BY_GEOLOCATION, UPDATE_APP_CONFIG_STORE, UPDATE_CURRENT_WEATHER_INFO,
}) => {
  const classes = useStyles();
  const query = useQuery();
  const URL_ROUTE_VALID = (match.params.locationId && query.get('search'));

  React.useEffect(() => {
    if (URL_ROUTE_VALID) {
      UPDATE_CURRENT_WEATHER_INFO({
        name: query.get('search'),
        key: match.params.locationId,
      });
      UPDATE_APP_CONFIG_STORE({ isAppReady: true });
    }
  }, []);

  React.useEffect(() => {
    const dataInit = async () => {
      const geolocationPermission = await navigator.permissions.query({ name: 'geolocation' });

      if (geolocationPermission.state === 'granted' && !URL_ROUTE_VALID) {
        geolocation.getCurrentPosition(async (err, position) => {
          if (err) { throw err; }
          const data = await SET_WHEATHER_DATA_BY_GEOLOCATION(position.coords.latitude, position.coords.longitude);
          history.push(`/weather/${data.locationData.Key}/?search=${data.locationData.LocalizedName}`);
        });
      }

      // defualt location to TLV if geoloaction is not enabled
      else {
        const data = await SET_WHEATHER_DATA_BY_GEOLOCATION('32.045', '34.77');
        history.push(`/weather/${data.locationData.Key}/?search=${data.locationData.LocalizedName}`);
      }
    };
    UPDATE_APP_CONFIG_STORE({ isAppReady: true });
    if (!URL_ROUTE_VALID) dataInit();
  }, [URL_ROUTE_VALID]);

  return (
    <Container className={classes.root} maxWidth={false}>
      <Route path="/:tab/:locationId?" render={(url) => <HeroloTabs url={url} />} />
      <Switch>
        <Route path="/weather/:locationId?" component={Weather} />
        <Route path="/favorites" component={Favorites} />
        <Redirect exact to="/weather" />
      </Switch>
    </Container>
  );
};

AppRouter.propTypes = {
  UPDATE_APP_CONFIG_STORE: PropTypes.func.isRequired,
  UPDATE_CURRENT_WEATHER_INFO: PropTypes.func.isRequired,
  SET_WHEATHER_DATA_BY_GEOLOCATION: PropTypes.func.isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => ({
  appConfig: state.appConfig,
});

const mapDispatchToProps = (dispatch) => ({
  UPDATE_CURRENT_WEATHER_INFO: (payload) => dispatch({ type: 'UPDATE_CURRENT_WEATHER_INFO', payload }),
  SET_WHEATHER_DATA_BY_GEOLOCATION: (lat, lon) => dispatch(weatherActions.SET_WHEATHER_DATA_BY_GEOLOCATION(lat, lon)),
  UPDATE_APP_CONFIG_STORE: (payload) => dispatch(appConfigActions.UPDATE_APP_CONFIG(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);
