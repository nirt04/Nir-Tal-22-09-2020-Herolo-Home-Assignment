import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import "./App.css";
import HeroloTabs from "./components/HeroloTabs/HeroloTabs";
// import HeroloAutocomplete from "./Views/Weather/components/HeroloAutocomplete/HeroloAutocomplete";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import Weather from "./Views/Weather/Weather";
import { Box, Grid } from "@material-ui/core";

const theme = createMuiTheme({
	palette: {
		type: "dark",
		primary: {
			main: "#FFFFFF",
		},
		secondary: {
			main: "#ffffff6e",
		},
	},
	breakpoints: {
		// Define custom breakpoint values.
		// These will apply to Material-UI components that use responsive
		// breakpoints, such as `Grid` and `Hidden`. You can also use the
		// theme breakpoint functions `up`, `down`, and `between` to create
		// media queries for these breakpoints
		values: { xs: 0, sm: 450, md: 600, lg: 900, xl: 1200, test: 1120 },
	},
});
function App() {
	const [selectedLocation, setselectedLocation] = React.useState(null);
	return (
		<MuiThemeProvider theme={theme}>
			<Router>
				<div className="App">
					<Box height="100%" display="flex" flexDirection="column">
						{/* HEADER */}
						<Box flexGrow={0}>
							<Route
								path="/:tab/:locationId?"
								render={(url) => <HeroloTabs url={url} />}
							/>
						</Box>
						{/* BODY */}
						<Box flexGrow={1}>
							<Switch>
								<Route
									path="/weather/:locationId?"
									component={Weather}
								/>
								<Route path="/favorite">
									{" "}
									<h1>favorite</h1>{" "}
								</Route>
								<Redirect exact to="/weather" />
							</Switch>
						</Box>
						{/* FOOTER */}
					</Box>
				</div>
			</Router>
		</MuiThemeProvider>
	);
}

export default App;
