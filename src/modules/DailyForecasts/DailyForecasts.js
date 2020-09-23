import ForcastCard from "./components/ForcastCard";
import CircularProgress from "@material-ui/core/CircularProgress";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import days_of_daily_forecasts from "../../data/5_days_of_daily_forecasts.json";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function DailyForecasts(props) {
  React.useEffect(() => {
    console.log("location changed", props);
  }, [props.locationId]);
  debugger;
  const [spacing, setSpacing] = React.useState(2);
  const [forecastsDays, setForecastsDays] = React.useState(
    days_of_daily_forecasts.DailyForecasts
  );
  const classes = useStyles();

  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Grid container justify="center" direction="row">
          {forecastsDays.map((item, i) => (
            <Grid key={i} item md={12} lg={'auto'} xs={12} >
              <Box display="flex">
                {/* <CircularProgress color="inherit" size={20} /> */}
                {i !== 0 && <Divider orientation="vertical" flexItem />}
                <ForcastCard item={item} />
                {/* <Divider orientation="vertical" /> */}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
