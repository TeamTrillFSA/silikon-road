const router = require('express').Router();
const {Order} = require('../db/models');
module.exports = router;

router.get('/:id', (req, res, next) => {
  Order.findById(req.params.id, {
    include: [{all: true}]
  })
    .then(order => res.json(order))
    .catch(next)
});

