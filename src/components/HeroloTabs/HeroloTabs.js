import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { connect } from 'react-redux';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link } from 'react-router-dom';
import { Box, FormControlLabel, Switch } from '@material-ui/core';
import appConfigActions from '../../App/redux/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 0,
    flexGrow: 1,
    backgroundColor: theme.palette.background.primary,
  },
}));

function HeroloTabs({ updateAppConfig, url, appConfig }) {
  const [isDark, setIsDark] = React.useState(appConfig.themeType === 'dark');
  const [value, setValue] = React.useState(url.match.params.tab || 'weather');

  const handleSwitchChange = (event) => {
    updateAppConfig({ themeType: event.target.checked ? 'dark' : 'light' });
    setIsDark(event.target.checked);
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabProps = (index, tabName) => {
    const { locationId } = url.match.params;
    const query = url.location.search;
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
      label: tabName,
      value: tabName,
      to: `/${tabName}${locationId ? `/${locationId}` : ''}/${query}`,
      component: Link,
    };
  };

  const classes = useStyles();

  React.useEffect(() => {
    setValue(url.match.params.tab);
  }, [url.match.params.tab]);

  return (
    <AppBar position="static" className={classes.root}>
      <Tabs
        value={value}
        onChange={handleTabChange}
        aria-label="simple tabs example"
      >
        <Tab {...tabProps(0, 'weather')} />
        <Tab {...tabProps(1, 'favorites')} />
      </Tabs>
      <Box marginLeft="auto">
        <FormControlLabel
          control={(
            <Switch
              checked={isDark}
              onChange={handleSwitchChange}
              color="default"
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
        )}
          label={appConfig.themeType === 'dark' ? 'Dark' : 'Light'}
        />
      </Box>
    </AppBar>
  );
}

HeroloTabs.propTypes = {
  updateAppConfig: PropTypes.func.isRequired,
  url: PropTypes.objectOf(PropTypes.any).isRequired,
  appConfig: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => ({
  appConfig: state.appConfig,
});

const mapDispatchToProps = (dispatch) => ({
  updateAppConfig: (payload) => dispatch(appConfigActions.UPDATE_APP_CONFIG(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeroloTabs);
