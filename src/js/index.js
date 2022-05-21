import '../css/index.css';
import getLocationData from './api/ipinfo';
import getWeatherData from './api/openweathermap';
import getImage from './api/unsplash';

getLocationData()
  .then(({ lat, lon }) => getWeatherData(lat, lon))
  .then((data) => getImage(data.current.weather.description))
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });
