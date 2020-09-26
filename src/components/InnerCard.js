import { Card } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

const InnerCard = (props) => {
  const useStyles = makeStyles((theme) => ({
    innerCard: {
      backgroundColor: `${theme.palette.innerCard[props.appConfig.themeType]} !important`,
    },
  }));
  const classes = useStyles();
  debugger;
  return <Card className={`${classes.innerCard} ${props.className}`}>{props.children}</Card>;
};

const mapStateToProps = (state) => ({
  appConfig: state.appConfig,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(InnerCard);
