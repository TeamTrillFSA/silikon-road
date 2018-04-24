const router = require('express').Router();
const { OrderProduct } = require('../db/models');

// Updating the order_product relationship; adding a product to an order
router.post('/', (req, res, next) => {
  OrderProduct.create(req.body)
    .then(lineitem => res.status(201).send(lineitem))
    .catch(next);
});

router.put('/', (req, res, next) => {
  return OrderProduct.findOne({
    where: {
      orderId: req.body.orderId,
      productId: req.body.productId,
    },
  })
    .then(lineitem => {
      return lineitem.update({
        quantity: req.body.quantity,
      });
    })
    .then(lineitem => res.status(201).send(lineitem))
    .catch(next);
});


module.exports = router;
