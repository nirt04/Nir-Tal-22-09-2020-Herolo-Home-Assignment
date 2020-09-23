import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import CardMedia from "@material-ui/core/CardMedia";

import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import moment from "moment";
const useStyles = makeStyles({
  media: {
    margin: "auto",
    width: "150px",
    height: "150px",
  },
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function ForcastCard(props) {
  const { item } = props;

  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {item ? moment(item.Date).format("dddd") : ""}
        </Typography>
        <CardMedia className={classes.media} image={`https://developer.accuweather.com/sites/default/files/${item.Day.Icon.toString().padStart( 2, "0" )}-s.png`} title="Paella dish" />
        <Typography variant="h5" component="h2">{item.Day.IconPhrase}</Typography>
  <Typography className={classes.pos} color="textSecondary"> {`${item.Temperature.Maximum.Value}°${item.Temperature.Maximum.Unit}`}</Typography>
  <Typography className={classes.pos} color="textSecondary"> {`${item.Temperature.Minimum.Value}°${item.Temperature.Minimum.Unit}`}</Typography>
        <Typography variant="body2" component="p"> well meaning and kindly. <br /> {'"a benevolent smile"'} </Typography>
      </CardContent>

      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

ForcastCard.propTypes = {
  item: PropTypes.object.isRequired,
};
