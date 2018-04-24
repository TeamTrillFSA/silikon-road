const router = require('express').Router();
const { Product } = require('../db/models');

router.get('/', (req, res, next) => {
  Product.findAll()
    .then(products => res.json(products))
    .catch(next);
});

router.get('/:productId', (req, res, next) => {
  Product.findById(req.params.productId)
    .then(product => res.json(product))
    .catch(next);
});

router.post('/', (req, res, next) => {
  if (req.user) {
    Product.create(req.body)
      .then(product => res.status(201).send(product))
      .catch(next);
  } else {
    res.sendStatus(401);
  }
});

module.exports = router;
