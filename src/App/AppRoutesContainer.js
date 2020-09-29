import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';

import { connect } from 'react-redux';
import { Container } from '@material-ui/core';
import geolocation from 'geolocation';
import { useStyles } from './style';
import HeroloTabs from '../components/HeroloTabs/HeroloTabs';
import Weather from '../Views/Weather/Weather';
import Favorites from '../Views/Favorites/Favorites';
import appConfigActions from './actions';
import weatherActions from '../Views/Weather/actions';

const useQuery = () => new URLSearchParams(useLocation().search);

export const AppRouter = (props) => {
  const classes = useStyles();
  const query = useQuery();
  const URL_ROUTE_VALID = (props.match.params.locationId && query.get('search'));

  const dataInit = async () => {
    const geolocationPermission = await navigator.permissions.query({ name: 'geolocation' });

    if (geolocationPermission.state === 'granted' && !URL_ROUTE_VALID) {
      geolocation.getCurrentPosition(async (err, position) => {
        if (err) throw err;
        const data = await props.SET_WHEATHER_DATA_BY_GEOLOCATION(position.coords.latitude, position.coords.longitude);
        props.history.push(`/weather/${data.locationData.Key}/?search=${data.locationData.LocalizedName}`);
      });
    }

    // defualt location to TLV if geoloaction is not enabled
    else {
      const data = await props.SET_WHEATHER_DATA_BY_GEOLOCATION('32.045', '34.77');
      props.history.push(`/weather/${data.locationData.Key}/?search=${data.locationData.LocalizedName}`);
    }
  };

  React.useEffect(() => {
    debugger;
    if (URL_ROUTE_VALID) props.updateAppConfig({ isAppReady: true });
    else (async () => await dataInit())();
  }, [URL_ROUTE_VALID]);

  return (
    <Container className={classes.root} maxWidth={false}>
      <Route path="/:tab/:locationId?" render={(url) => <HeroloTabs url={url} />} />
      <Switch>
        <Route path="/weather/:locationId?" component={Weather} />
        <Route path="/favorites" component={Favorites} />
      </Switch>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  appConfig: state.appConfig,
});

const mapDispatchToProps = (dispatch) => ({
  SET_WHEATHER_DATA_BY_GEOLOCATION: (lat, lon) => dispatch(weatherActions.SET_WHEATHER_DATA_BY_GEOLOCATION(lat, lon)),
  updateAppConfig: (payload) => dispatch(appConfigActions.UPDATE_APP_CONFIG(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);
