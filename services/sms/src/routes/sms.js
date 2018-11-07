const express = require('express');
const createResponse = require('../util/createResponse');

const router = express.Router();

router.get('/:id', (req, res) => {
  res.json(createResponse.success(req.params));
});

router.post('/', (req, res) => {
  res.json(req.body);
});

module.exports = router;
