import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Link } from "react-router-dom";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function HeroloTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(null);
  React.useEffect(() => {
    setValue(props.url.params.tab);
  }, [props.url.params.tab]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab
            label="weather"
            {...a11yProps(0)}
            component={Link}
            to="/weather/"
            value="weather"
          />
          <Tab
            value="favorite"
            label="favorite"
            {...a11yProps(1)}
            component={Link}
            to="/favorite/"
          />
        </Tabs>
      </AppBar>
    </div>
  );
}
