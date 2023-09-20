// backend entry point

// dependencies
const express = require('express');
const cors = require('cors');
const app = express();

const fetchWordFromExternalAPI = require('./services/APIService');
const scramble = require('./services/Scramble');

// allow ports 8080 and 3000 to be used simultaneousl
app.use(cors());
const port = 8080;

/*
* @GET random word from external API
*/
app.get('/word', async (req, res) => {
  try {
    const length = req.query['length'];
    console.log(length);
    const unscrambled = await fetchWordFromExternalAPI(length);
    console.log(unscrambled);
    const scrambled = await scramble(unscrambled);
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

