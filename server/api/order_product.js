const router = require('express').Router();
const { OrderProduct, Order } = require('../db/models');

// Updating the order_product relationship; adding a product to an order
router.post('/', (req, res, next) => {
  OrderProduct.create(req.body)
    .then(products => res.status(201).send(products))
    .catch(next);
});

router.get('/order/:orderId/product/:productId', (req, res, next) => {
  OrderProduct.findOne({ where: { orderId: req.params.orderId, productId: req.params.orderId } })
    .then(orderProduct => res.json(orderProduct))
    .catch(next);
});

router.put('/order/:orderId/product/:productId', (req, res, next) => {
  const putOrdProd = async () => {
    const order = await Order.findById(req.params.orderId);
    const { userId } = order;

    if (req.user && req.user.id === userId) {
      const orderProduct = await OrderProduct.findOne({
        where: {
          orderId: req.params.orderId,
          productId: req.params.orderId,
        },
      });
      await orderProduct.update({ quantity: res.body.quantity });
      res.sendStatus(204);
    } else {
      res.sendStatus(403);
    }
  };

  putOrdProd()
    .then(null, next);
});

module.exports = router;
