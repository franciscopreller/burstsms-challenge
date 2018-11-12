const express = require('express');
const Bitly = require('../lib/Bitly');
const createResponse = require('../util/createResponse');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    // If the parameter 'urls' is passed we take multiple
    if (Object.keys(req.body).includes('urls') && Array.isArray(req.body.urls)) {
      const response = await Promise.all(req.body.urls.map(async (url) => {
        const shortUrl = await Bitly.shortenUrl(url);
        return shortUrl.link;
      }));
      res.json(createResponse.success(response));
    } else if (Object.keys(req.body).includes('url')) {
      const response = await Bitly.shortenUrl(req.body.url);
      res.json(createResponse.success(response));
    } else {
      res.status(400);
      res.json(createResponse.error(
        new Error('Request must contain fields \'url\' or \'urls\''),
      ));
    }
  } catch (error) {
    console.error('Error caught on shorten POST / route', error);
    res.status(error.status || 500);
    res.json(createResponse.error(error));
  }
});

module.exports = router;
