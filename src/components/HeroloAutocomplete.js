// *https://www.registers.service.gov.uk/registers/country/use-the-api*
// import fetch from "cross-fetch";
import React from "react";
import TextField from "@material-ui/core/TextField";

import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
}));

export default function HeroloAutocomplete(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  return (
    <Autocomplete

      {...props}
      getOptionSelected={(option, value) => (value && option) && option.Key === value.Key}
      renderOption={(option) => {
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
      // style={{ width: '100%' }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      renderInput={(params) => (
        <TextField
        autoFocus 
          {...params}
          label="Select Location"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {props.loading ? (
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
