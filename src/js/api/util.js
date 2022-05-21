async function makeRequest(url) {
  const response = await fetch(url);
  if (!response.ok || response.status !== 200) {
    throw new Error(`Network request failed. Status: ${response.status}`);
  }
  return response.json();
}

export default makeRequest;
