// *https://www.registers.service.gov.uk/registers/country/use-the-api*
// import fetch from "cross-fetch";
import React from "react";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";

import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import cities_autocomplete from "../data/cities_autocomplete.json";
function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}
const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
}));

export default function HeroloAutocomplete(props) {
  const { onChange } = props;

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [options, setOptions] = React.useState([]);

  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const response = cities_autocomplete;
      await sleep(1e3); // For demo purposes.
      //   const countries = response;
      debugger;
      setOptions(response);
      //   if (active) {
      //     setOptions(Object.keys(countries).map((key) => countries[key].item[0]));
      //   }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      onChange={(event, selectedItem) => {
        setSelectedItem(selectedItem);
        if (onChange) props.onChange(event, selectedItem);
      }}
      renderOption={(option) => {
        // const matches =
        //   option.structured_formatting.main_text_matched_substrings;
        // const parts = parse(
        //   option.structured_formatting.main_text,
        //   matches.map((match) => [match.offset, match.offset + match.length])
        // );

        return (
          <Grid container alignItems="center">
            <Grid item>
              <LocationOnIcon className={classes.icon} />
            </Grid>
            <Grid item xs>
              <Typography variant="body2" color="textSecondary">
                {`${option.LocalizedName}, ${option.Country.LocalizedName}`}
              </Typography>
            </Grid>
          </Grid>
        );
      }}
      id="asynchronous-demo"
      style={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option.Key === value.Key}
      getOptionLabel={(option) =>
        `${option.LocalizedName}, ${option.Country.LocalizedName}`
      }
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select Location"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
HeroloAutocomplete.propTypes = {
  onChange: PropTypes.func,
};
