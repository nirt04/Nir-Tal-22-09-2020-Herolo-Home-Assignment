import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";

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

const theme = createMuiTheme({
  palette: {
    type: "dark",
    innerCard: {
      main: "#461eb7",
    },
    OutterCard: {
      main: "#3810ae",
    },
    primary: {
      main: "#3810AE",
    },
    neutral: {
      main: "#FFFFF",
    },
    secondary: {
      main: "#ffffff6e",
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
function App() {
  const classes = useStyles();
  const [selectedLocation, setselectedLocation] = React.useState(null);
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <Box height="100%" display="flex" flexDirection="column">
            <CardMedia
              className={classes.media}
              image="https://www.wallpaperflare.com/static/656/666/467/landscape-mountains-clouds-forest-wallpaper.jpg"
            />
            {/* HEADER */}
            <Box flexGrow={0} zIndex={1}>
              <Route
                path="/:tab/:locationId?"
                render={(url) => <HeroloTabs url={url} />}
              />
            </Box>
            {/* BODY */}
            <Box flexGrow={1} zIndex={1}>
              <Switch>
                <Route path="/weather/:locationId?" component={Weather} />
                <Route path="/favorite" component={Favorite} />

                <Redirect exact to="/weather" />
              </Switch>
            </Box>
            {/* FOOTER */}
          </Box>
        </div>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
