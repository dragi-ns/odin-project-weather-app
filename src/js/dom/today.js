import { format, fromUnixTime } from 'date-fns';
import { createElement, createEvent } from './util';
import displayWeather from './weather';

function createCardFooter(feelsLike, description, units) {
  return createElement({
    tagName: 'footer',
    attributes: {
      class: 'card-footer',
    },
    content: `Feels like ${Math.trunc(
      feelsLike
    )}&deg;${units}. ${description[0].toUpperCase()}${description
      .slice(1)
      .toLowerCase()}.`,
    useInnerHTML: true,
  });
}

function createCardBody(icon, description, temp, maxTemp, minTemp, units) {
  return createElement({
    attributes: {
      class: 'card-body',
    },
    children: [
      createElement({
        tagName: 'img',
        attributes: {
          src: `http://openweathermap.org/img/wn/${icon}@2x.png`,
          alt: description,
        },
      }),
      createElement({
        attributes: {
          class: 'temps',
        },
        children: [
          createElement({
            tagName: 'span',
            attributes: {
              class: 'current-temp',
            },
            content: `${Math.trunc(temp)}&deg;${units}`,
            useInnerHTML: true,
          }),
          createElement({
            children: [
              createElement({
                tagName: 'span',
                attributes: {
                  class: 'max-temp',
                },
                content: `${Math.trunc(maxTemp)}&deg;${units}`,
                useInnerHTML: true,
              }),
              createElement({
                tagName: 'span',
                attributes: {
                  class: 'min-temp',
                },
                content: `${Math.trunc(minTemp)}&deg;${units}`,
                useInnerHTML: true,
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

function createCardHeader(dt, name, country, units) {
  return createElement({
    tagName: 'header',
    attributes: {
      class: 'card-header',
    },
    children: [
      createElement({
        children: [
          createElement({
            tagName: 'span',
            attributes: {
              class: 'dt',
            },
            content: format(fromUnixTime(dt), 'MMM dd, H:mm'),
          }),
          createElement({
            tagName: 'span',
            attributes: {
              class: 'loc',
            },
            content: `${name}, ${country}`,
          }),
        ],
      }),
      createElement({
        tagName: 'button',
        attributes: {
          class: 'unit-toggle',
        },
        content: `&deg;${units}`,
        useInnerHTML: true,
        events: [
          createEvent('click', () => {
            const unitsName = units === 'F' ? 'metric' : 'imperial';
            localStorage.setItem('units', unitsName);
            displayWeather({
              cityName: name,
              units: unitsName,
            });
          }),
        ],
      }),
    ],
  });
}

function createCard(locationData, weatherData, units) {
  return createElement({
    tagName: 'article',
    attributes: {
      class: 'card card-today',
    },
    children: [
      createCardHeader(
        weatherData.dt,
        locationData.name,
        locationData.country,
        units
      ),
      createCardBody(
        weatherData.weather.icon,
        weatherData.weather.description,
        weatherData.temp,
        weatherData.maxTemp,
        weatherData.minTemp,
        units
      ),
      createCardFooter(
        weatherData.feelsLike,
        weatherData.weather.description,
        units
      ),
    ],
  });
}

function createTodaySection(locationData, weatherData, units) {
  return createElement({
    tagName: 'section',
    attributes: {
      class: 'today',
    },
    children: [
      createElement({
        tagName: 'h2',
        content: 'Today',
      }),
      createCard(locationData, weatherData, units),
    ],
  });
}

export default createTodaySection;
