const { URL } = require('url'); // Import the URL object
const request_url = "https://random-word-api.herokuapp.com/word?length=";

async function fetchWordFromExternalAPI(length) {
  try {
    const fetch = await import('node-fetch'); // Use dynamic import
    console.log(request_url);
    const response = await fetch.default(request_url + length); // Use fetch.default
    const data = await response.json();
    return data[0]; // returns array of length 1
  } catch (error) {
    console.error('Error fetching word:', error);
    return 'Error';
  }
}


module.exports = fetchWordFromExternalAPI;