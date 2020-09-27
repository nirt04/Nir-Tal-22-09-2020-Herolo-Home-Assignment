import { Box, Grid, Typography } from "@material-ui/core";
import React from "react";
import { Route } from "react-router-dom";
import HeroloAutocomplete from "../../../components/HeroloAutocomplete/HeroloAutocomplete";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
}));
export default function WelcomeSearch() {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} >
      <Typography color="textPrimary" variant="h4" gutterBottom > Hello there Giborlo. </Typography>
      <Typography color="textPrimary" variant="h4" gutterBottom > Welcome to my weather application.</Typography>
      <Box mt={2}>
        <Typography color="textPrimary" m={2} variant="subtitle2" gutterBottom >
          Yet too often some very human cultural artifacts really lead the
          business down the certain routes.
        </Typography>
      </Box>
      <Box mt={'auto'} width="100%">
        <Route component={HeroloAutocomplete} />
      </Box>
        {/* <Box mt={2}>
          <Typography color="textPrimary" variant="subtitle2" >
            Best way to know your ciry weather.
          </Typography>
        </Box> */}
    </Grid>
  );
}
