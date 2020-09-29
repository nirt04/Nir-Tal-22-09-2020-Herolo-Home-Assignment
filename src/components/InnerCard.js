import { Card } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const InnerCard = ({ className, appConfig, children }) => {
  const useStyles = makeStyles((theme) => ({
    innerCard: {
      backgroundColor: `${theme.palette.innerCard[appConfig.themeType]} !important`,
    },
  }));
  const classes = useStyles();
  return <Card className={`${classes.innerCard} ${className} fgadfgdsfgdsfgkjdsfoikgjdofjg`}>{children}</Card>;
};

InnerCard.defaultProps = {
  className: '',
};

InnerCard.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  appConfig: PropTypes.objectOf(PropTypes.any).isRequired,

};
const mapStateToProps = (state) => ({
  appConfig: state.appConfig,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(InnerCard);
