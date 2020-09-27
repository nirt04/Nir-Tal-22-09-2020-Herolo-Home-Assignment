import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { HashRouter as Router } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import "./App.css";
import { connect } from "react-redux";
import { theme } from "./plugins/material-ui";
import HeroloTabs from "./components/HeroloTabs/HeroloTabs";
import Weather from "./Views/Weather/Weather";
import { CardMedia, Grid } from "@material-ui/core";
import Favorite from "./Views/Favorite/Favorite";
import appConfigActions from "./App/actions"


function App(props) {
  
  React.useEffect(() => {
    props.updateAppConfig({isAppReady: true})
  }, [])
  
  const [selectedLocation, setselectedLocation] = React.useState(null);
  return (
    <MuiThemeProvider theme={theme(props)}>
      <CardMedia
        className="app--bg-image"
        image="https://www.wallpaperflare.com/static/656/666/467/landscape-mountains-clouds-forest-wallpaper.jpg"
      />
      <Router>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Route
              path={"/:tab/:locationId?"}
              render={(url) => <HeroloTabs url={url} />}
            />
          </Grid>
          <Grid item xs={12}>
            <Switch>
              <Route path={"/weather/:locationId?"} component={Weather} />
              <Route path={"/favorite"} component={Favorite} />
              <Redirect exact to={"/weather"} />
            </Switch>
          </Grid>
        </Grid>
      </Router>
    </MuiThemeProvider>
  );
}

const mapStateToProps = (state) => {
  return {
    appConfig: state.appConfig,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateAppConfig: (payload) => dispatch(appConfigActions.UPDATE_APP_CONFIG(payload)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
