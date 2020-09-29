import React from 'react';
import PropTypes from 'prop-types';
import { Card, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  root: {
    padding: '17px',
    height: 'max-content',
  },
}));

export const GridContainer = ({ children }) => {
  const classes = useStyles();
  return (
    <Card className={`${classes.root}`}>
      <Grid container spacing={3}>
        {children.map((node, i) => (
          <Grid item xs={12} key={i}>
            {node}
          </Grid>
        ))}
      </Grid>
    </Card>
  );
};

GridContainer.propTypes = {
  children: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.node])).isRequired,

};
