// *https://www.registers.service.gov.uk/registers/country/use-the-api*
// import fetch from "cross-fetch";

import React from "react";
import { connect } from "react-redux";
import { util } from "../../services/util";
import TextField from "@material-ui/core/TextField";
import {  useLocation } from "react-router-dom";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Grid from "@material-ui/core/Grid";
// import ListboxComponent from "./ListboxComponent"
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import HTTP from "../../services/HTTP";
import CITEIS_AUTOCOMPLETE_DATA from "../../data/cities_autocomplete.json";
import { Paper } from "@material-ui/core";
import "./WeatherAutocomplete.scss";
const useStyles = makeStyles((theme) => ({
	root: {
		// padding: 0,
		background: "#3810AE",
		padding: "2px 4px",
		display: "flex",
		alignItems: "center",
	},

	icon: {
		color: theme.palette.text.secondary,
		marginRight: theme.spacing(2),
	},

	resultsList: {

	},
}));

const useQuery = () => new URLSearchParams(useLocation().search);
/* prettier-ignore */

function HeroloAutocomplete(props) {
	const query = useQuery();
	const [open, setOpen] = React.useState(false);
	const [loading, setLoading] = React.useState(false);
	const [items, setItems] = React.useState([]);
	const [value, setValue] = React.useState(null);
	const [input, setInput] = React.useState(null);
	const locationId = props.match.params.locationId

	const fetchCities = async (searchQuery) => {
		console.log("fetchCities");
		let cities;
		setLoading(true);
		if (!searchQuery) cities = [];
		else {
			await util.sleep(1000);
			cities = CITEIS_AUTOCOMPLETE_DATA || (await HTTP.get("locations/v1/cities/autocomplete", { language: "en-us", q: searchQuery, }));
		}

		setLoading(false);
		return cities;
	};

	const setNewVal = (newVal) => {
		setValue(newVal);
		if (!newVal) {
			props.history.push(`/weather`);
			props.dispatchCurrentWeatherInfo({ name: null, key: null });
			return;
		} else {
			props.history.push( `/weather/${newVal.Key}/?search=${newVal.LocalizedName}` );
			props.dispatchCurrentWeatherInfo({
				name: `${newVal.LocalizedName}${ newVal.Country ? ", " + newVal.Country.LocalizedName : "" }`,
				key: newVal.Key,
			});
		}
	};

	const onMountedData = async () => {
		const searchQuery = query.get("search");
		const cities = await fetchCities(searchQuery);
		setItems(cities);
		if (locationId) {
			// If there is locationId in the route we wants to select it from the items we fetched to the autocomplete
			const itemInOptions = cities.find( (option) => option.Key === locationId );
			setNewVal(itemInOptions);
		}
	};

	// On Mounted
	React.useEffect(() => {
		onMountedData();
	}, []);

	util.useDebounce(input, 1000, async () => { if (input) setItems(await fetchCities(input)); });
	const classes = useStyles();


	return (
		
		<Autocomplete
		className="WeatherAutocomplete--main-container"
			onInputChange={async (event, searchQuery) => {
				// Emiting the function only if input changed came from user typing and not by clicking on of the options
				if (event && event.type === "change" && searchQuery)
					setInput(searchQuery);
			}}
			onChange={(event, newVal) => setNewVal(newVal)} 
			// ListboxComponent={ListboxComponent}
			getOptionLabel={(option) => `${option.LocalizedName}, ${ option.Country ? option.Country.LocalizedName : "" }` }
			value={value}
			options={items}
			loading={loading}
			margin="dense"
			getOptionSelected={(option, value) => value && option && option.Key === value.Key }
			open={open}
			onOpen={() => { setOpen(true); }}
			onClose={() => { setOpen(false); }}
			renderOption={(option) => {
				return (
					<Grid container alignItems="center" className={classes.resultsList}>
						<Grid item>
							<LocationOnIcon className={classes.icon} />
						</Grid>
						<Grid item xs className={classes.resultsList}>
							<Typography variant="body2" color="textSecondary">{`${option.LocalizedName}, ${option.Country.LocalizedName}`}</Typography>
						</Grid>
					</Grid>
				);
			}}
			renderInput={(params) => (
				<Paper component="form" className={classes.root}>	
				<TextField
				className="WeatherAutocomplete--input"
				color="natural"
				disableUnderline
					autoFocus
					{...params}
					// margin="dense"
					placeholder="Select Location"
					variant="outlined"
					InputProps={{
						...params.InputProps,
						startAdornment: (<SearchIcon className="mr-1"/>),
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
			  </Paper>
			)}
		/>
	);
}

const mapStateToProps = (state) => {
	return {
		// fiveDay: state.fiveDay,
		// currentWeather: state.currentWeatherReducer,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		dispatchCurrentWeatherInfo: (payload) =>
			dispatch({ type: "UPDATE_CURRENT_WEATHER_INFO", payload }),
		// dispatchFiveDaysData: (payload) => dispatch({ type: "ADD_FIVE_DAY_FETCH_DATA", payload }),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(HeroloAutocomplete);
