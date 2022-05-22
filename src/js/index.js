import '../css/index.css';
import { getLocationData } from './api/openweathermap';
import displayWeather from './dom/weather';

document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.querySelector('.search-form');
  const cityName = searchForm.elements['city-name'];
  const cityNameError = cityName.nextElementSibling;
  function showError() {
    if (cityName.validity.valueMissing) {
      cityNameError.textContent = 'You need to enter a city name!';
    } else if (cityName.validity.tooLong) {
      cityNameError.textContent = `City name should have max ${cityName.maxLength} characters; you entered ${cityName.value.length}`;
    }
    cityNameError.className = 'error active';
  }

  cityName.addEventListener('input', () => {
    if (cityName.validity.valid) {
      cityNameError.textContent = '';
      cityNameError.className = 'error';
    } else {
      showError();
    }
  });

  cityName.addEventListener('blur', () => {
    cityName.value = cityName.value.trim();
  });

  searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!cityName.validity.valid) {
      showError();
      return;
    }

    try {
      await getLocationData(cityName.value);
    } catch (error) {
      cityNameError.textContent = error.message;
      showError();
      return;
    }

    displayWeather({ cityName: cityName.value });
  });
  displayWeather({});
});
