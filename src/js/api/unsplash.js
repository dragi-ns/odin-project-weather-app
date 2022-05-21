import makeRequest from './util';

function processImageData(data) {
  const { description, links, urls, user } = data.results[0];
  return {
    description,
    htmlLink: links.html,
    url: urls.regular,
    username: user.username,
    fullName: user.name,
  };
}

async function getImage(description) {
  const data = await makeRequest(
    `https://api.unsplash.com/search/photos/?query=${description}&per_page=1&orientation=landscape&order_by=relevant&client_id=mqP5VirKzl1MGcER3xOlAPxqRvdD6xphkH4-EHHUpT0`
  );
  return processImageData(data);
}

export default getImage;

// TODO: When fetching background add this credit at the footer
// Photo by <a href="https://unsplash.com/@username">full name</a> on <a href="https://unsplash.com/@htmlLInk">Unsplash</a>
