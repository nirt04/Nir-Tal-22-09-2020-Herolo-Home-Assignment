import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import CardMedia from '@material-ui/core/CardMedia';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import moment from 'moment';

const convert = require('convert-units');

const useStyles = makeStyles({
  media: {
    backgroundSize: 'auto',
    width: '47px',
    height: '45px',
  },
  weatherInfo: {
    margin: '10px',
  },
  root: {
    borderRadius: 0,
    maxWidth: 185,
    minWidth: 185,
  },
  unitText: {
    margin: '3px 5px',
  },
});

function ForcastCard(props) {
  const { item } = props;
  const tempCumpute = (temp) => Math.floor(props.appConfig.tempratureUnit === 'Imperial' ? convert(temp).from('C').to('F') : temp);
  const tempratureUnit = `°${props.appConfig.tempratureUnit === 'Imperial' ? 'F' : 'C'}`;
  const classes = useStyles();

  return (
    item && (
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Typography variant="h6" color="textSecondary" style={{marginTop: '10px'}}>
            {' '}
            {moment(item.Date).format('dddd')}
            {' '}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" component="h2">
            {item.Day.IconPhrase}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Box marginTop="10px">
            <CardMedia className={classes.media} image={`https://developer.accuweather.com/sites/default/files/${item.Day.Icon.toString().padStart(2, '0')}-s.png`} />
          </Box>
        </Grid>
        <Grid container item xs={12} className={classes.weatherInfo}>

          <Grid item xs={12} sm={12}>
            <Box display="flex" justifyContent="space-between">
              <Box display="flex">
                <Typography variant="h4">
                  {tempCumpute(item.Temperature.Maximum.Value)}
                </Typography>
                <Typography variant="h5" className={classes.unitText}>
                  {tempratureUnit}
                </Typography>
              </Box>
              <Box display="flex">
                <Typography variant="h4" color="textSecondary">
                  {tempCumpute(item.Temperature.Minimum.Value)}
                </Typography>
                <Typography variant="h5" color="textSecondary" className={classes.unitText}>
                  {tempratureUnit}
                </Typography>
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

const mapStateToProps = (state) => ({
  appConfig: state.appConfig,
});

export default connect(mapStateToProps)(ForcastCard);
