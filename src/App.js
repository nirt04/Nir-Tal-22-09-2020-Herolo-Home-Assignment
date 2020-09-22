import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";
import HeroloTabs from "./components/HeroloTabs";
import HeroloAutocomplete from "./components/HeroloAutocomplete";
import DailyForecasts from "./modules/DailyForecasts/DailyForecasts";

function App() {
  const [selectedLocation, setSelectedLocation] = React.useState(null);
  return (
    <div className="App">
      <DailyForecasts location={selectedLocation} />
      <HeroloAutocomplete onChange={(event, item) => setSelectedLocation(item)} />
    </div>
  );
}

export default App;
