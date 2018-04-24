const router = require('express').Router();
const { Order } = require('../db/models');

module.exports = router;

router.get('/:id', (req, res, next) => {
  Order.findById(req.params.id, {
    include: [{ all: true }],
  })
    .then(order => {
      if (req.user && req.user.id === order.user.id) {
        res.json(order);
      } else {
        res.sendStatus(403);
      }
    })
    .catch(next);
});

router.post('/', (req, res, next) => {
  const { status, userId, addressId } = req.body;

  if (req.user.id !== userId) {
    res.statusCode(403);
  } else {
    Order.create({ status, userId, addressId })
      .then(order => res.status(201).send(order))
      .catch(next);
  }
});

router.put('/:id', (req, res, next) => {
  Order.findById(req.params.id)
    .then(order => order.update(req.body))
    .catch(next);
});

