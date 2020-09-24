import HTTP from "../HTTP";
export const accuweatherAPI = {
  fiveDays: (loactionId) =>
    HTTP.get(
      `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${loactionId}`,
      { language: "en-us", details: true, metric: true }
    ),

  autocompleteCities: (searchQuery) => {
    if (!searchQuery) return [];
    return HTTP.get("locations/v1/cities/autocomplete", {
      language: "en-us",
      q: searchQuery,
    });
  },
  
  currentWeather: (loactionId) => {
    return HTTP.get(
      `http://dataservice.accuweather.com/currentconditions/v1/${loactionId}`,
      { language: "en-us", details: true }
    );
  },
};
