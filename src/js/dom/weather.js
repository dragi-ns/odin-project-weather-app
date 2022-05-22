import { render } from './util';
import createTodaySection from './today';
import createDailySection from './daily';
import createBackgroundCredit from './credit';
import { getLocationData, getWeatherData } from '../api/openweathermap';
import getImage from '../api/unsplash';

const DEFAULT_LOCATION_DATA = {
  name: 'Novi Sad',
  country: 'RS',
  lat: '45.267136',
  lon: '19.833549',
};

async function displayWeather({ cityName = null }) {
  const { body } = document;
  const mainContainer = document.querySelector('main > .container');
  body.dataset.loading = true;
  mainContainer.parentElement.classList.remove('loaded');
  mainContainer.innerHTML = '';

  let locationData = null;
  if (cityName) {
    locationData = await getLocationData(cityName);
  } else {
    locationData =
      JSON.parse(localStorage.getItem('locationData')) ?? DEFAULT_LOCATION_DATA;
  }
  localStorage.setItem('locationData', JSON.stringify(locationData));

  const weatherData = await getWeatherData(locationData.lat, locationData.lon);
  render(createTodaySection(locationData, weatherData.current), mainContainer);
  render(createDailySection(weatherData.daily), mainContainer);

  let imageDescription = weatherData.current.weather.description;
  if (weatherData.current.weather.icon.endsWith('n')) {
    imageDescription += ' night';
  }
  const imageData = await getImage(imageDescription);
  body.style.backgroundImage = `url('${imageData.url}')`;
  render(
    createBackgroundCredit(
      imageData.username,
      imageData.fullName,
      imageData.htmlLink
    ),
    mainContainer
  );
  body.dataset.loading = false;
  mainContainer.parentElement.classList.add('loaded');
}

export default displayWeather;
