const requestUrl = 'https://random-word-api.herokuapp.com/word?length=';

/**
 * fetches a random word of specified length from external API
 * @param {int} length  Length of word to fetch
 * @return {string}     A random word
 */
async function fetchWordFromExternalAPI(length) {
  try {
    const fetch = await import('node-fetch'); // Use dynamic import
    console.log(requestUrl);
    const response = await fetch.default(requestUrl + length);
    const data = await response.json();
    return data[0];
  } catch (error) {
    console.error('Error fetching word:', error);
    return 'Error';
  }
}

module.exports = fetchWordFromExternalAPI;
