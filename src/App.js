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
    <div className="App">
      <HeroloTabs />
      <DailyForecasts location={selectedLocation} />
      <HeroloAutocomplete onChange={(event, item) => setselectedLocation(item)} />

      <Router>
        {/* {!isDesktop && <ScrollToTop />} */}
        {/* <Header /> */}
        <Switch>
          {/* {1 + 1 == 2 && <Redirect exact from="/as" to="/categories/farmers" />} */}
          <Route path="/categories/:categoryId">
            <h1>categories</h1>
          </Route>
          <Route path="/">
            <h1>Home</h1>
          </Route>
        </Switch>
        {/* <Footer /> */}
      </Router>
    </div>
  );
}

export default App;
