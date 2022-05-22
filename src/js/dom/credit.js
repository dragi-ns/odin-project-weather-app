import { createElement } from './util';

function createBackgroundCredit(username, name, htmlLink) {
  return createElement({
    attributes: {
      class: 'background-credits',
    },
    content: 'Background image by ',
    children: [
      createElement({
        tagName: 'a',
        attributes: {
          href: `https://unsplash.com/@${username}`,
          target: '_blank',
        },
        content: name,
      }),
      createElement({
        tagName: 'span',
        content: ' on ',
      }),
      createElement({
        tagName: 'a',
        attributes: {
          href: htmlLink,
          target: '_blank',
        },
        content: 'Unsplash',
      }),
    ],
  });
}

export default createBackgroundCredit;
