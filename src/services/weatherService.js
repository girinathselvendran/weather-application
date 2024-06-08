const getDailyForecast = async (latitude, longitude) => {
  const response = await fetch(
    `https://atlas.microsoft.com/weather/forecast/daily/json?api-version=1.0&query=${latitude},${longitude}&subscription-key=${process.env.REACT_APP_AZURE_MAPS_KEY}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }
  return response.json();
};

const getHistoricalWeatherRecords = async (
  latitude,
  longitude,
  startDate,
  endDate
) => {
  const response = await fetch(
    `https://atlas.microsoft.com/weather/historical/records/daily/json?api-version=1.1&query=${latitude},${longitude}&startDate=${startDate}&endDate=${endDate}&unit=metric&subscription-key=${process.env.REACT_APP_AZURE_MAPS_KEY}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }
  return response.json();
};

export { getDailyForecast, getHistoricalWeatherRecords };
