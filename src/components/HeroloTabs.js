import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Link } from "react-router-dom";




const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function HeroloTabs(props) {

  const tabProps = (index, tabName) => {
    const locationId = props.url.match.params.locationId;
    const query = props.url.location.search;
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
      label: tabName,
      value: tabName,
      to: `/${tabName}${locationId ? "/" + locationId : ""}/${ query }`,
      component: Link,
    };
  }
  
  const classes = useStyles();
  const [value, setValue] = React.useState(null);

  React.useEffect(() => {
    setValue(props.url.match.params.tab);
  }, [props.url.match.params.tab]);
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };



  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" >
          <Tab {...tabProps(0, "weather")} />
          <Tab {...tabProps(1, "favorite")} />
        </Tabs>
      </AppBar>
    </div>
  );
}
