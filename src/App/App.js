import "./App.css";
import React from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { HashRouter as Router, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { theme } from "../plugins/material-ui";
import { CardMedia, Container, Grid } from "@material-ui/core";
import AppRoutesContainer from "./AppRoutesContainer";
function App(props) {
  const [selectedLocation, setselectedLocation] = React.useState(null);
  return (
    <MuiThemeProvider theme={theme(props)}>
      <CardMedia
        className="app--bg-image"
        image="https://www.wallpaperflare.com/static/656/666/467/landscape-mountains-clouds-forest-wallpaper.jpg"
      />
      <Router>
        <Route path={"/:tab/:locationId?"} component={AppRoutesContainer} />
        <Redirect exact to={"/weather"} />
      </Router>
    </MuiThemeProvider>
  );
}

const mapStateToProps = (state) => {
  return {
    appConfig: state.appConfig,
  };
};

export default connect(mapStateToProps)(App);
