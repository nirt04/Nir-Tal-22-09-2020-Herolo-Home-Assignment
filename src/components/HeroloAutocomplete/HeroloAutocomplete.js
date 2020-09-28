// *https://www.registers.service.gov.uk/registers/country/use-the-api*
// import fetch from "cross-fetch";

import React from "react";
import { connect } from "react-redux";
import { util } from "../../services/util";
import TextField from "@material-ui/core/TextField";
import { useLocation } from "react-router-dom";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import HTTP from "../../services/HTTP";
import CITEIS_AUTOCOMPLETE_DATA from "../../data/cities_autocomplete.json";
import { Paper } from "@material-ui/core";
import "./WeatherAutocomplete.scss";
import autocompleteActions from "./actions";
const useQuery = () => new URLSearchParams(useLocation().search);
/* prettier-ignore */

function HeroloAutocomplete(props) {


	const useStyles = makeStyles((theme) => ({
		
		root: {
			backgroundColor: theme.palette.outterCard[props.APP_CONFIG_STORE.themeType],
			padding: "2px 4px",
			display: "flex",
			alignItems: "center",
		},
	
		icon: {
			marginRight: theme.spacing(2),
		},

	}));

	const query = useQuery();
	const URL_SEARCH_QUERY = query.get("search");


	const [fetchQuery, setFetchQuery] = React.useState(null);
	const [input, setInput] = React.useState(null);
	const [loading, setLoading] = React.useState(false);
	const [open, setOpen] = React.useState(false);
	const [items, setItems] = React.useState([]);
	const [value, setValue] = React.useState(null);
	const locationId = props.match.params.locationId

	const handleInputChange = (event, inputVal) => {
		debugger;
		if(event && event.type === 'blur') return;
		else if(event && event.type === 'change') {
			props.history.push(`/weather/${locationId}/?search=${inputVal}` );
			setFetchQuery(inputVal)
		}
		setInput(inputVal || '')
	};

	const setNewVal = (newVal) => {
		debugger;
		if (!newVal) return;
		else {
			props.history.push(`/weather/${newVal.Key}/?search=${newVal.LocalizedName}` );
			props.UPDATE_CURRENT_WEATHER_INFO({
				name: `${newVal.LocalizedName}${ newVal.Country ? ", " + newVal.Country.LocalizedName : "" }`,
				key: newVal.Key
			});
		}
		setValue(newVal);
	};

	const onComponentMount = async () => {
		debugger;
		setInput(URL_SEARCH_QUERY || '')
		setFetchQuery(URL_SEARCH_QUERY || '')
		const fetchItems = await props.SET_AUTOCOMPLETE_DATA_BY_QUERY(URL_SEARCH_QUERY);
		setItems(fetchItems);
		if (locationId) {
			// If there is locationId in the route we wants to select it from the items we fetched to the autocomplete
			const itemInOptions = fetchItems.find( (option) => option.Key === locationId );
			setNewVal(itemInOptions);
		}
	};

	// On Mounted
	React.useEffect(() => {
		onComponentMount();
	}, []);

	util.useDebounce(fetchQuery, 1000, async () => {
		if (fetchQuery && fetchQuery.length > 1) {
			setLoading(true)
			const fetchItems = await props.SET_AUTOCOMPLETE_DATA_BY_QUERY(fetchQuery);
			setItems(fetchItems)
			setLoading(false)
		} 	
	});
	const classes = useStyles();
// debugger;

	return (
		
		<Autocomplete
		className="WeatherAutocomplete--main-container"
			onInputChange={handleInputChange}
			onChange={(event, newVal) => setNewVal(newVal)} 
			getOptionLabel={(option) => `${option.LocalizedName}, ${ option.Country ? option.Country.LocalizedName : "" }` }
			value={value}
			inputValue={input}
			options={props.AUTOCOMPLETE_STORE.data[fetchQuery] || []}
			loading={loading}
			margin="dense"
			getOptionSelected={(option, value) => value && option && option.Key === value.Key }
			open={open}
			onOpen={() => { setOpen(true); }}
			onClose={() => { setOpen(false); }}
			renderOption={(option) => {
				return (
					<Grid container alignItems="center" className="asdsadlfgjoedfikghjokdfsghj" >
						<Grid item>
							<LocationOnIcon className={classes.icon} />
						</Grid>
						<Grid item xs >
							<Typography variant="body2" >{`${option.LocalizedName}, ${option.Country.LocalizedName}`}</Typography>
						</Grid>
					</Grid>
				);
			}}
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
    APP_CONFIG_STORE: state.appConfig,
    AUTOCOMPLETE_STORE: state.autocomplete,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    UPDATE_CURRENT_WEATHER_INFO: (payload) => dispatch({ type: "UPDATE_CURRENT_WEATHER_INFO", payload }),
    SET_AUTOCOMPLETE_DATA_BY_QUERY: (query) => dispatch(autocompleteActions.SET_AUTOCOMPLETE_DATA_BY_QUERY(query)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeroloAutocomplete);
