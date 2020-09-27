import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import { connect } from "react-redux";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Link } from "react-router-dom";
import { Switch } from "@material-ui/core";
import appConfigActions from "../../App/actions"
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 0,
    flexGrow: 1,
    backgroundColor: theme.palette.background.primary,
  },
}));

function HeroloTabs(props) {
  const [isDark, setIsDark] = React.useState( props.appConfig.themeType === "dark" );

  const handleSwitchChange = (event) => {
    props.updateAppConfig({ themeType: event.target.checked ? 'dark' : 'light'});
    setIsDark( event.target.checked );
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabProps = (index, tabName) => {
    const locationId = props.url.match.params.locationId;
    const query = props.url.location.search;
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
      label: tabName,
      value: tabName,
      to: `${process.env.PUBLIC_URL}/${tabName}${locationId ? "/" + locationId : ""}/${query}`,
      component: Link,
    };
  };

  const classes = useStyles();
  const [value, setValue] = React.useState(null);

  React.useEffect(() => {
    setValue(props.url.match.params.tab);
  }, [props.url.match.params.tab]);

  return (
    // <div className={classes.root}>
    <AppBar position="static" className={classes.root}>
      <Tabs
        value={value}
        onChange={handleTabChange}
        aria-label="simple tabs example"
      >
        <Tab {...tabProps(0, "weather")} />
        <Tab {...tabProps(1, "favorite")} />
      </Tabs>
      <Switch
        className="ml-auto"
        checked={isDark}
        onChange={handleSwitchChange}
        color="primary"
        inputProps={{ "aria-label": "primary checkbox" }}
      />
    </AppBar>
    // </div>
  );
}

const mapStateToProps = (state) => {
  return {
    appConfig: state.appConfig,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateAppConfig: (payload) =>
      dispatch(appConfigActions.UPDATE_APP_CONFIG(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeroloTabs);
