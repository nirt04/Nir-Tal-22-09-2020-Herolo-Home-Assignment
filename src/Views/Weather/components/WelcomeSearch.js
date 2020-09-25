import { Box, Grid, Typography } from "@material-ui/core";
import React from "react";
import { Route } from "react-router-dom";
import HeroloAutocomplete from "../../../components/HeroloAutocomplete/HeroloAutocomplete";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {},
}));
export default function WelcomeSearch() {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Diffrent kind of weather
      </Typography>
      <Typography variant="h4" gutterBottom>
        inside of 24/7 hours.
      </Typography>
      <Box mt={2}>
        <Typography m={2} variant="subtitle2" gutterBottom>
          Yet too often some very human cultural artifacts really lead the
          business down the certain routes.
        </Typography>
      </Box>
      <Box mt={8} width="100%">
        <Route component={HeroloAutocomplete} />
        <Box mt={2}>
          <Typography variant="subtitle2">
            Best way to know your ciry weather.
          </Typography>
        </Box>
      </Box>
      {/* <Grid item xs={12} style={{ padding: 0 }}> */}
      {/* </Grid> */}
      {/* <Grid item xs={12}>
        <Route exact path="/weather/:locationId/" component={CurrentWeather} />
      </Grid>
      <Grid item xs={12}>
        <Route
          exact
          path="/weather/:locationId/"
          component={FiveDailyForecasts}
        />
      </Grid> */}
    </Grid>
  );
}
