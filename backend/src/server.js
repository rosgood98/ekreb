const express = require('express');
const cors = require('cors');
const app = express();

const fetchWordFromExternalAPI = require('./services/ApiService');
const scramble = require('./services/Scramble');

app.use(cors());
const port = 8080;

/*
* @GET random word from external API
*/
app.get('/word', async (req, res) => {
  try {
    const unscrambled = await fetchWordFromExternalAPI();
    const scrambled = await scramble(word);
    res.json({ unscrambled: unscrambled, scrambled: scrambled });
  } catch (error) {
    console.error('Error fetching word:', error);
    res.status(500).json({ error: 'An error occurred while fetching the word' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

