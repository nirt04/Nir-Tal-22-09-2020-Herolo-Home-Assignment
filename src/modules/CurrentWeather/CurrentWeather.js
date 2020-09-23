import React from "react";
import current_weather from "../../data/current_weather.json";
export default function CurrentWeather(props) {
  const [currentWeather, setCurrentWeather] = React.useState(current_weather);

  React.useEffect(() => {
    console.log("location changed", props, currentWeather);
  }, [props.locationId]);
  return (
    <div>
      <h1>hello current_weather </h1>
    </div>
  );
}
