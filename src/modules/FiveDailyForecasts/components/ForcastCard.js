import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import CardMedia from "@material-ui/core/CardMedia";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import moment from "moment";
const useStyles = makeStyles({
  media: {
    margin: "auto",
    width: "150px",
    height: "150px",
  },
  papaer: {
    textAlign: "center",
  },
  weatherInfo: {
    margin: "10px",
  },
  root: {
    // margin: "0 10px",
    borderRadius: 0,
    maxWidth: 185,
    minWidth: 185,
  },
  unitText: {
    margin: "3px 5px",
  },

  title: {
    fontSize: 14,
  },
  pos: {
    // marginBottom: 12,
  },
});

export default function ForcastCard(props) {
  const { item } = props;

  const classes = useStyles();

  return (
    item && (
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Typography
            variant="h6"
            color="textSecondary"
            gutterBottom
            align="center"
          >
            {moment(item.Date).format("dddd")}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <CardMedia
            className={classes.media}
            image={`https://developer.accuweather.com/sites/default/files/${item.Day.Icon.toString().padStart(
              2,
              "0"
            )}-s.png`}
          />
        </Grid>
        <Grid container item xs={12} className={classes.weatherInfo}>
          <Grid item xs={12}>
            <Typography variant="h6" component="h2">
              {item.Day.IconPhrase}
            </Typography>{" "}
          </Grid>
          <Grid item xs={12} sm={12}>
            <Box display="flex" justifyContent="space-between">
              <Box display="flex">
                <Typography variant="h4">{`${Math.floor(
                  item.Temperature.Maximum.Value
                )}`}</Typography>
                <Typography
                  variant="h5"
                  className={classes.unitText}
                >{`°${item.Temperature.Maximum.Unit}`}</Typography>
              </Box>
              <Box display="flex">
                <Typography variant="h4" color="textSecondary">{`${Math.floor(
                  item.Temperature.Minimum.Value
                )}`}</Typography>
                <Typography
                  variant="h5"
                  color="textSecondary"
                  className={classes.unitText}
                >{`°${item.Temperature.Minimum.Unit}`}</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    )
  );
}

ForcastCard.propTypes = {
  item: PropTypes.object.isRequired,
};
