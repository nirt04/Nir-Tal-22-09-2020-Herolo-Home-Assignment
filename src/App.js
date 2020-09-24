import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import "./App.css";
import HeroloTabs from "./components/HeroloTabs";
import HeroloAutocomplete from "./components/HeroloAutocomplete";
import CurrentWeather from "./modules/CurrentWeather/CurrentWeather";
import Weather from "./Views/Weather/Weather";

const theme = createMuiTheme({
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
  const [selectedLocation, setselectedLocation] = React.useState(null);
  return (
    // <MuiThemeProvider theme={theme}>
    <Router>
      <div className="App">
        {/* HEADER */}
        <Route path="/:tab/:locationId?" render={(url) => <HeroloTabs url={url} />} />

        {/* BODY */}
        <Switch>
          <Route path="/weather/:locationId?" component={Weather} />
          <Route path="/favorite"> <h1>favorite</h1> </Route>
          <Redirect exact to="/weather" />
        </Switch>
        {/* FOOTER */}
      </div>
    </Router>
    // </MuiThemeProvider>
  );
}

export default App;
