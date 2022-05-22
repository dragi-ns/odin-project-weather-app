import { format, fromUnixTime } from 'date-fns';
import { createElement } from './util';

function createCardFooter(feelsLike, description) {
  return createElement({
    tagName: 'footer',
    attributes: {
      class: 'card-footer',
    },
    content: `Feels like ${Math.trunc(
      feelsLike
    )}&deg;C. ${description[0].toUpperCase()}${description
      .slice(1)
      .toLowerCase()}.`,
    useInnerHTML: true,
  });
}

function createCardBody(icon, description, temp, maxTemp, minTemp) {
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
            content: `${Math.trunc(temp)}&deg;C`,
            useInnerHTML: true,
          }),
          createElement({
            children: [
              createElement({
                tagName: 'span',
                attributes: {
                  class: 'max-temp',
                },
                content: `${Math.trunc(maxTemp)}&deg;C`,
                useInnerHTML: true,
              }),
              createElement({
                tagName: 'span',
                attributes: {
                  class: 'min-temp',
                },
                content: `${Math.trunc(minTemp)}&deg;C`,
                useInnerHTML: true,
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

function createCardHeader(dt, name, country) {
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
    ],
  });
}

function createCard(locationData, weatherData) {
  return createElement({
    tagName: 'article',
    attributes: {
      class: 'card card-today',
    },
    children: [
      createCardHeader(weatherData.dt, locationData.name, locationData.country),
      createCardBody(
        weatherData.weather.icon,
        weatherData.weather.description,
        weatherData.temp,
        weatherData.maxTemp,
        weatherData.minTemp
      ),
      createCardFooter(weatherData.feelsLike, weatherData.weather.description),
    ],
  });
}

function createTodaySection(locationData, weatherData) {
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
      createCard(locationData, weatherData),
    ],
  });
}

export default createTodaySection;
