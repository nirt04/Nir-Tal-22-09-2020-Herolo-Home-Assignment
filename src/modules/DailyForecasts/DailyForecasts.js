import React from "react";
import ForcastCard from "./components/ForcastCard";

export default function DailyForecasts(props) {
  React.useEffect(() => {
    console.log("location changed", props);
  }, [props.location]);

  return (
    <div>
      <ForcastCard />
    </div>
  );
}
