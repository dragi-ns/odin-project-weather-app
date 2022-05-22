import makeRequest from './util';

function processWeatherData(data) {
  function extractDayData(dayData) {
    const { dt, feels_like: feelsLike, temp, weather } = dayData;
    return {
      dt,
      feelsLike,
      temp,
      weather: weather[0],
    };
  }
  const current = extractDayData(data.current);
  current.maxTemp = data.daily[0].temp.max;
  current.minTemp = data.daily[0].temp.min;
  const daily = data.daily.slice(1).map(extractDayData);
  return { current, daily };
}

async function getWeatherData(lat, lon) {
  const data = await makeRequest(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=metric&appid=60248eb14580b4855ad35e4611829094`
  );
  return processWeatherData(data);
}

function processLocationData(data) {
  const { name, country, lat, lon } = data[0];
  return { name, country, lat, lon };
}

async function getLocationData(cityName) {
  const data = await makeRequest(
    `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=60248eb14580b4855ad35e4611829094`
  );
  if (data.length === 0) {
    throw new Error('Invalid city name!');
  }
  return processLocationData(data);
}

export { getWeatherData, getLocationData };
