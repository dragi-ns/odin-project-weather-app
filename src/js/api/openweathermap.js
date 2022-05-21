import makeRequest from './util';

function processWeatherData(data) {
  function extractDayData(dayData) {
    const {
      clouds,
      dt,
      feels_like: feelsLike,
      humidity,
      pressure,
      sunrise,
      sunset,
      temp,
      uvi,
      weather,
      wind_speed: windSpeed,
    } = dayData;
    return {
      clouds,
      dt,
      feelsLike,
      humidity,
      pressure,
      sunrise,
      sunset,
      temp,
      uvi,
      weather: weather[0],
      windSpeed,
    };
  }
  const current = extractDayData(data.current);
  const daily = data.daily.map(extractDayData);
  return { current, daily };
}

async function getWeatherData(lat, lon) {
  const data = await makeRequest(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=metric&appid=60248eb14580b4855ad35e4611829094`
  );
  return processWeatherData(data);
}

export default getWeatherData;
