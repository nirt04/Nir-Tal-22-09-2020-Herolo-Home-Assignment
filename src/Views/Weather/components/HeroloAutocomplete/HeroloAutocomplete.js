// *https://www.registers.service.gov.uk/registers/country/use-the-api*
// import fetch from "cross-fetch";

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { useLocation } from 'react-router-dom';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { Paper } from '@material-ui/core';
import { util } from 'services/util.js';
import './WeatherAutocomplete.scss';
import autocompleteActions from './actions';

const useQuery = () => new URLSearchParams(useLocation().search);
/* prettier-ignore */

function HeroloAutocomplete({
  match,
  history,
  CURRENT_WEATHER_STORE,
  APP_CONFIG_STORE,
  SET_AUTOCOMPLETE_DATA_BY_QUERY,
  AUTOCOMPLETE_STORE,
  UPDATE_CURRENT_WEATHER_INFO,
}) {
  const useStyles = makeStyles((theme) => ({

    root: {
      backgroundColor: theme.palette.outterCard[APP_CONFIG_STORE.themeType],
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
    },

    icon: {
      marginRight: theme.spacing(2),
    },

  }));

  const query = useQuery();
  const URL_SEARCH_QUERY = query.get('search');

  const [fetchQuery, setFetchQuery] = React.useState(null);
  const [input, setInput] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(null);
  const { locationId } = match.params;

  const handleInputChange = (event, inputVal) => {
    if (event && event.type === 'blur') return;
    setInput(inputVal || '');
    if (event && event.type === 'change') {
      setFetchQuery(inputVal);
    }
  };

  const setNewVal = (newVal) => {
    if (!newVal) return;
    history.push(`/weather/${newVal.Key}/?search=${newVal.LocalizedName}`);
    UPDATE_CURRENT_WEATHER_INFO({
      name: `${newVal.LocalizedName}${newVal.Country ? `, ${newVal.Country.LocalizedName}` : ''}`,
      key: newVal.Key,
    });

    setValue(newVal);
  };

  const onComponentMount = async () => {
    setInput(URL_SEARCH_QUERY || '');
    setFetchQuery(URL_SEARCH_QUERY || '');
    const fetchItems = await SET_AUTOCOMPLETE_DATA_BY_QUERY(URL_SEARCH_QUERY);
    if (locationId && fetchItems) {
      // If there is locationId in the route we wants to select it from the items we fetched to the autocomplete
      const itemInOptions = fetchItems.find((option) => option.Key === locationId);
      setNewVal(itemInOptions);
    }
  };

  React.useEffect(() => {
    const curWeatherName = CURRENT_WEATHER_STORE.info.name;
    if (CURRENT_WEATHER_STORE.info.name) setInput(curWeatherName);
  }, [CURRENT_WEATHER_STORE]);

  // On Mounted
  React.useEffect(() => {
    onComponentMount();
  }, []);

  util.useDebounce(fetchQuery, 1000, async () => {
    if (fetchQuery && fetchQuery.length > 1) {
      setLoading(true);
      await SET_AUTOCOMPLETE_DATA_BY_QUERY(fetchQuery);
      setLoading(false);
    }
  });
  const classes = useStyles();
  return (

    <Autocomplete
      className="WeatherAutocomplete--main-container"
      onInputChange={handleInputChange}
      onChange={(event, newVal) => setNewVal(newVal)}
      getOptionLabel={(option) => `${option.LocalizedName}, ${option.Country ? option.Country.LocalizedName : ''}`}
      value={value}
      inputValue={input}
      options={AUTOCOMPLETE_STORE.data[fetchQuery] || []}
      loading={loading}
      margin="dense"
      getOptionSelected={(option, optionValue) => optionValue && option && option.Key === optionValue.Key}
      open={open}
      onOpen={() => { setOpen(true); }}
      onClose={() => { setOpen(false); }}
      renderOption={(option) => (
        <Grid container alignItems="center" className="asdsadlfgjoedfikghjokdfsghj">
          <Grid item>
            <LocationOnIcon className={classes.icon} />
          </Grid>
          <Grid item xs>
            <Typography variant="body2">{`${option.LocalizedName}, ${option.Country.LocalizedName}`}</Typography>
          </Grid>
        </Grid>
      )}
      renderInput={(params) => (
        <Paper component="form" className={classes.root}>
          <TextField
            className="WeatherAutocomplete--input"
            {...params}
            autoFocus
            placeholder="Select Location"
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              startAdornment: (<SearchIcon className="mr-1" />),
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}

                  {params.InputProps.endAdornment}
                </>),
            }}
          />
        </Paper>
      )}
    />
  );
}
HeroloAutocomplete.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  CURRENT_WEATHER_STORE: PropTypes.objectOf(PropTypes.any).isRequired,
  APP_CONFIG_STORE: PropTypes.objectOf(PropTypes.any).isRequired,
  AUTOCOMPLETE_STORE: PropTypes.objectOf(PropTypes.any).isRequired,
  SET_AUTOCOMPLETE_DATA_BY_QUERY: PropTypes.func.isRequired,
  UPDATE_CURRENT_WEATHER_INFO: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  CURRENT_WEATHER_STORE: state.currentWeather,
  APP_CONFIG_STORE: state.appConfig,
  AUTOCOMPLETE_STORE: state.autocomplete,
});

const mapDispatchToProps = (dispatch) => ({
  UPDATE_CURRENT_WEATHER_INFO: (payload) => dispatch({ type: 'UPDATE_CURRENT_WEATHER_INFO', payload }),
  SET_AUTOCOMPLETE_DATA_BY_QUERY: (query) => dispatch(autocompleteActions.SET_AUTOCOMPLETE_DATA_BY_QUERY(query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeroloAutocomplete);
