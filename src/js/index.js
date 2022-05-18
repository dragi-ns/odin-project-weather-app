import '../css/index.css';

async function getLocationData(locationName) {
  const response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${locationName}&limit=1&appid=60248eb14580b4855ad35e4611829094`
  );
  const data = await response.json();
  if (data.length !== 0) {
    return data[0];
  }
  return null;
}

function processLocationData(locationData) {
  if (locationData === null) {
    return null;
  }
  const { name, country, lat, lon } = locationData;
  return { name, country, lat, lon };
}

async function getWeatherData(locationName) {
  const locationData = processLocationData(await getLocationData(locationName));
  if (locationData === null) {
    return null;
  }
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${locationData.lat}&lon=${locationData.lon}&units=metric&appid=60248eb14580b4855ad35e4611829094`
  );
  const weatherData = await response.json();
  return weatherData;
}

function processWeatherData(weatherData) {
  if (weatherData === null) {
    return null;
  }
  return { ...weatherData.main };
}

const searchCityForm = document.querySelector('#search-city');
searchCityForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const cityName = event.currentTarget.elements['city-name'].value.trim();
  if (cityName.length === 0) {
    return;
  }
  getWeatherData(event.currentTarget.elements['city-name'].value.trim())
    .then(processWeatherData)
    .then((data) => document.body.append(JSON.stringify(data)));
});
