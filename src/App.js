import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";
import HeroloTabs from "./components/HeroloTabs";
import HeroloAutocomplete from "./components/HeroloAutocomplete";
import DailyForecasts from "./modules/DailyForecasts/DailyForecasts";

function App() {
  const [selectedLocation, setselectedLocation] = React.useState(null);
  return (
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
                      history.push(`/weather/${item.Key}`)
                    }
                  />

                  <Route
                    exact
                    path="/weather/:locationId/"
                    render={({ match }) => (
                      <DailyForecasts location={selectedLocation} url={match} />
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
  );
}

export default App;
