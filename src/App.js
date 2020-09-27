import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

import HeroloTabs from "./components/HeroloTabs/HeroloTabs";
// import HeroloAutocomplete from "./Views/Weather/components/HeroloAutocomplete/HeroloAutocomplete";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import Weather from "./Views/Weather/Weather";
import { Box, CardMedia, Grid } from "@material-ui/core";
import Favorite from "./Views/Favorite/Favorite";

const useStyles = makeStyles({
  media: {
    backgroundSize: "cover",
    // margin: "auto",
    width: "100vw",
    height: "100vh",
    opacity: 0.15,
    "-webkit-mask-image":
      " -webkit-linear-gradient(right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1))",
    position: "fixed",
    backgroundImage: "url(https://www.ubackground.com/_ph/17/563786933.jpg)",
  },
});

function App(props) {
  const theme = createMuiTheme({
    palette: {
      type: props.appConfig.themeType,
      background: {
        paper: props.appConfig.themeType == "dark" ? "#3810ae" : "#FFFF",
      },
      innerCard: {
        light: "#FFFF",
        dark: "#461eb7",
      },
      outterCard: {
        light: "#FFFF",
        dark: "#3810ae",
      },
    },
    breakpoints: {
      // Define custom breakpoint values.
      // These will apply to Material-UI components that use responsive
      // breakpoints, such as `Grid` and `Hidden`. You can also use the
      // theme breakpoint functions `up`, `down`, and `between` to create
      // media queries for these breakpoints
      values: { xs: 0, sm: 450, md: 600, lg: 900, xl: 1200, test: 1120 },
    },
  });
  const classes = useStyles();
  const [selectedLocation, setselectedLocation] = React.useState(null);
  return (
    <MuiThemeProvider theme={theme}>
      <CardMedia
        className={classes.media}
        image="https://www.wallpaperflare.com/static/656/666/467/landscape-mountains-clouds-forest-wallpaper.jpg"
      />

      <Router>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Route
              path={process.env.PUBLIC_URL + "/:tab/:locationId?"}
              render={(url) => <HeroloTabs url={url} />}
            />
          </Grid>
          <Grid item xs={12}>
            <Switch>
              <Route path={process.env.PUBLIC_URL + "/weather/:locationId?"} component={Weather} />
              <Route path={process.env.PUBLIC_URL + "/favorite"} component={Favorite} />
              <Redirect exact to={process.env.PUBLIC_URL + "/weather" }/>
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

export default connect(mapStateToProps)(App);
