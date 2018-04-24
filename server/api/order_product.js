const router = require('express').Router();
const { Order, OrderProduct } = require('../db/models');

// Updating the order_product relationship; adding a product to an order
router.post('/', (req, res, next) => {
  OrderProduct.create(req.body)
    .then(lineitem => res.status(201).send(lineitem))
    .catch(next);
});

router.put('/', (req, res, next) => {
  const putOrdProd = async () => {
    const order = await Order.findById(req.body.orderId);
    const { userId } = order;

    if (req.user && req.user.id === userId) {
      const orderProduct = await OrderProduct.findOne({
        where: {
          orderId: req.body.orderId,
          productId: req.body.productId,
        },
      });
      const updatedLineItem = await orderProduct.update({ quantity: req.body.quantity });
      res.json(updatedLineItem);
    } else {
      res.sendStatus(403);
    }
  };

  putOrdProd()
    .then(null, next);
});


module.exports = router;
