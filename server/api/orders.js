const router = require('express').Router();
const {Order} = require('../db/models');
module.exports = router;

router.get('/:id', (req, res, next) => {
  Order.findById(req.params.id, {
    include: [{all: true}]
  })
    .then(order => {
      if (req.user.id === order.user.id) {
        res.json(order)
      } else {
        res.sendStatus(401);
      }
    })
    .catch(next)
});

