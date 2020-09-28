import { Box, Button, Grid, Typography } from "@material-ui/core";
import React from "react";
import { Route } from "react-router-dom";
import HeroloAutocomplete from "../../../components/HeroloAutocomplete/HeroloAutocomplete";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  locateMeButton: {
    backgroundColor: "#0069d9",
    outline: "none",
    "&:focus": {
      outline: "none",
    },
  },
  autocomplete: {
    flexGrow: "1",
  },
}));
export default function WelcomeSearch() {
  const classes = useStyles();

  /* prettier-ignore */
  return (
    <Grid container className={classes.root}>
      
      <Grid item xs={12}>
        <Typography color="textPrimary" variant="h4" gutterBottom>
          Hello there Giborlo.
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography color="textPrimary" variant="h4" gutterBottom>
          Welcome to my weather application.
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography color="textPrimary" m={2} variant="subtitle2" gutterBottom>
          Yet too often some very human cultural artifacts really lead the
          business down the certain routes.
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Grid container>

          <Grid item xs={12} md={12} lg={"auto"} className={classes.autocomplete} >
            <Route component={HeroloAutocomplete} />
          </Grid>

          <Grid item xs={12} md={12} lg={"auto"}>
            <Box display="flex" height="100%" marginLeft="5px">
               <Button color="primary" variant="contained" className={classes.locateMeButton} > LocateME </Button>
            </Box>
          </Grid>

        </Grid>
      </Grid>
    </Grid>
  );
}
