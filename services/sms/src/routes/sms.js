const express = require('express');
const BurstSMS = require('../lib/BurstSMS');
const createResponse = require('../util/createResponse');

const router = express.Router();
const burst = new BurstSMS({
  apiKey: process.env.BURSTSMS_KEY || '',
  secret: process.env.BURSTSMS_SECRET || '',
});

router.get('/:id', async (req, res) => {
  try {
    const response = await burst.getSMS({ id: req.params.id });
    res.json(createResponse.success(response));
  } catch (error) {
    console.error('Error caught on sms GET /:id route', error);
    res.status(error.status || 500);
    res.json(createResponse.error(error));
  }
});

router.post('/', async (req, res) => {
  try {
    const response = await burst.sendSMS(req.body);
    res.json(createResponse.success(response));
  } catch (error) {
    console.error('Error caught on sms POST / route', error);
    res.status(error.status || 500);
    res.json(createResponse.error(error));
  }
});

module.exports = router;
