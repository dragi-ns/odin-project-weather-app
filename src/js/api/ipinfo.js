import makeRequest from './util';

function processLocationData(data) {
  const [lat, lon] = data.loc.split(',');
  return { city: data.city, country: data.country, lat, lon };
}

async function getLocationData(ip = '') {
  const data = await makeRequest(
    `https://ipinfo.io/${ip}?token=761655e39f58f4`
  );
  return processLocationData(data);
}

export default getLocationData;
