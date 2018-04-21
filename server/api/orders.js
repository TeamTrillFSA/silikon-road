const router = require('express').Router();
const { Order, OrderProduct } = require('../db/models');

module.exports = router;

router.get('/:id', (req, res, next) => {
  Order.findById(req.params.id, {
    include: [{ all: true }],
  })
    .then(order => {
      if (req.user && req.user.id === order.user.id) {
        res.json(order);
      } else {
        res.sendStatus(401);
      }
    })
    .catch(next);
});

router.post('/', (req, res, next) => {
  Order.create({
    userId: req.user,
  })
    .then(order => {
      return OrderProduct.create({
        orderId: order.id,
        productId: req.body.productId,
        quantity: req.body.quantity,
        price: req.body.productPrice,
      });
    })
    .then(orderProduct => res.json(orderProduct))
    .catch(next);
});

