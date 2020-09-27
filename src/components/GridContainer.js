import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    padding: "17px",
    height: "max-content",
  },
}));

export const GridContainer = (props) => {
  const classes = useStyles();
  const childrens = props.children;

  debugger;
  return (
    <Card className={`${classes.root}`}>
      <Grid container spacing={3}>
        {childrens.map((child, i) => (
          <Grid item xs={12}>
            {child}
          </Grid>
        ))}
      </Grid>
    </Card>
  );
};

GridContainer.propTypes = {
  childrens: PropTypes.array.isRequired,
};
