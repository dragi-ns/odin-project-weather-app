import { format, fromUnixTime } from 'date-fns';
import { createElement } from './util';

function createCardFooter(description) {
  return createElement({
    tagName: 'footer',
    content: description,
  });
}

function createCardBody(icon, description, maxTemp, minTemp, units) {
  return createElement({
    attributes: {
      class: 'card-body',
    },
    children: [
      createElement({
        tagName: 'img',
        attributes: {
          src: `http://openweathermap.org/img/wn/${icon}.png`,
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
  });
}

function createCardHeader(dt) {
  return createElement({
    tagName: 'header',
    attributes: {
      class: 'card-header',
    },
    content: format(fromUnixTime(dt), 'iii, MMM dd'),
  });
}

function createCard(dayData, units) {
  return createElement({
    tagName: 'article',
    attributes: {
      class: 'card card-day',
    },
    children: [
      createCardHeader(dayData.dt),
      createCardBody(
        dayData.weather.icon,
        dayData.weather.description,
        dayData.temp.max,
        dayData.temp.min,
        units
      ),
      createCardFooter(dayData.weather.description),
    ],
  });
}

function createDailySection(dailyData, units) {
  return createElement({
    tagName: 'section',
    attributes: {
      class: 'daily',
    },
    children: [
      createElement({
        tagName: 'h2',
        content: '7-day forecast',
      }),
      createElement({
        attributes: {
          class: 'days',
        },
        children: dailyData.map((day) => createCard(day, units)),
      }),
    ],
  });
}

export default createDailySection;
