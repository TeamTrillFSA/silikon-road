const router = require('express').Router();
const {OrderProduct} = require('../db/models');

// Updating the order_product relationship; adding a product to an order
router.post('/', (req, res, next) => {
  OrderProduct.create(req.body)
    .then(products => res.json(products))
    .catch(next)
});


module.exports = router;