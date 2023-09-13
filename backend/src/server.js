const fetchWordFromExternalAPI = require('./services/ApiService');

const express = require('express');
const app = express();

const port = 8080;

/*
* @GET random word from external API
*/
app.get('/word', async (req, res) => {
  try {
    const newWord = await fetchWordFromExternalAPI();
    res.json({ word: newWord });
  } catch (error) {
    console.error('Error fetching word:', error);
    res.status(500).json({ error: 'An error occurred while fetching the word' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

