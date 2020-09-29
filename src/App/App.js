import './App.css';
import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { HashRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { CardMedia } from '@material-ui/core';
import { theme } from '../plugins/material-ui';
import AppRoutesContainer from './AppRoutesContainer';

function App(props) {
  return (
    <MuiThemeProvider theme={theme(props)}>
      <CardMedia
        className="app--bg-image"
        image="https://www.wallpaperflare.com/static/656/666/467/landscape-mountains-clouds-forest-wallpaper.jpg"
      />
      <Router>
        <Route path="/:tab/:locationId?" component={AppRoutesContainer} />
      </Router>
    </MuiThemeProvider>
  );
}

const mapStateToProps = (state) => ({
  appConfig: state.appConfig,
});

export default connect(mapStateToProps)(App);
