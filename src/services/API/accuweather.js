import HTTP from '../HTTP';

export const accuweatherAPI = {

  geopositionSearch: (lat, lon) => HTTP.get(
    'http://dataservice.accuweather.com/locations/v1/cities/geoposition/search',
    { q: `${lat},${lon}`, language: 'en-us', details: true },
    { cancelToken: 'fiveDay' },
  ),

  fiveDays: (loactionId, isMetric) => HTTP.get(
    `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${loactionId}`,
    { language: 'en-us', details: true, metric: true },
    { cancelToken: 'fiveDay' },
  ),

  autocompleteCities: (searchQuery) => {
    if (!searchQuery) return [];
    return HTTP.get(
      'locations/v1/cities/autocomplete',
      {
        language: 'en-us',
        q: searchQuery,
      },
      { cancelToken: 'autocomplete' },
    );
  },

  currentWeather: (loactionId) => HTTP.get(
    `http://dataservice.accuweather.com/currentconditions/v1/${loactionId}`,
    { language: 'en-us', details: true, toplevel: true },
    { cancelToken: 'currentconditions' },
  ),
};
