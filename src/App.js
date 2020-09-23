import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import "./App.css";
import HeroloTabs from "./components/HeroloTabs";
import HeroloAutocomplete from "./components/HeroloAutocomplete";
import DailyForecasts from "./modules/DailyForecasts/DailyForecasts";
const theme = createMuiTheme({
  breakpoints: {
    // Define custom breakpoint values.
    // These will apply to Material-UI components that use responsive
    // breakpoints, such as `Grid` and `Hidden`. You can also use the
    // theme breakpoint functions `up`, `down`, and `between` to create
    // media queries for these breakpoints
    values: {
      xs: 0,
      sm: 450,
      md: 600,
      lg: 900,
      xl: 1200,
      test: 1120,
    },
  },
});
function App() {
  const [selectedLocation, setselectedLocation] = React.useState(null);
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <div className="App">
          {/* HEADER */}
          <Route
            path="/:tab"
            render={({ match }) => <HeroloTabs url={match} />}
          />

          {/* BODY */}
          <Switch>
            <Route
              path="/weather"
              render={({ history }) => {
                return (
                  <React.Fragment>
                    <HeroloAutocomplete
                      onChange={(event, item) =>
                        history.push(`/weather/${item ? item.Key : ""}`)
                      }
                    />
                    <Route
                      exact
                      path="/weather/:locationId/"
                      render={({ match }) => (
                        <DailyForecasts locationId={match.params.locationId} />
                      )}
                    />
                  </React.Fragment>
                );
              }}
            />

            <Route path="/favorite/">
              <h1>favorite</h1>
            </Route>
            <Redirect exact to="/weather/redirect" />
          </Switch>
          {/* FOOTER */}
        </div>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
