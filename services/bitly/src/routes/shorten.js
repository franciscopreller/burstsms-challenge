const express = require('express');
const Bitly = require('../lib/Bitly');
const createResponse = require('../util/createResponse');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const response = await Bitly.shortenUrl(req.body.url);
    res.json(createResponse.success(response));
  } catch (error) {
    console.error('Error caught on shorten POST / route', error);
    res.status(error.status || 500);
    res.json(createResponse.error(error));
  }
});

module.exports = router;
