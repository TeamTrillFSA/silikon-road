const router = require('express').Router();
const { Address } = require('../db/models');

module.exports = router;

router.post('/', (req, res, next) => {
    Address.create(req.body)
      .then(address => res.status(201).send(address))
      .catch(next);
  });