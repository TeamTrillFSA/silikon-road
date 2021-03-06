const router = require('express').Router();
const User = require('../db/models/user');
const stripe = require('stripe')(process.env.STRIPE_SECRET);

module.exports = router;

const postStripeCharge = res => (stripeErr, stripeRes) => {
  if (stripeErr) {
    res.status(500).send({ error: stripeErr });
  } else {
    res.status(200).send({ success: stripeRes });
  }
};

router.post('/login', (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email.trim().toLowerCase(),
    },
    include: [{ all: true, nested: true }],
  })
    .then(user => {
      if (!user) {
        console.error('No such user found:', req.body.email);
        res.status(401).send('Wrong username and/or password');
      } else if (!user.correctPassword(req.body.password)) {
        console.error('Incorrect password for user:', req.body.email);
        res.status(401).send('Wrong username and/or password');
      } else {
        req.login(user, err => (err ? next(err) : res.json(user)));
      }
    })
    .catch(next);
});

router.post('/signup', (req, res, next) => {
  User.create(Object.assign({}, req.body, { isGuest: false }))
    .then(user => {
      req.login(user, err => (err ? next(err) : res.json(user)));
    })
    .catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(401).send('User already exists');
      } else {
        next(err);
      }
    });
});

router.post('/guestsignup', (req, res, next) => {
  User.create(req.body)
    .then(user => {
      req.login(user, err => (err ? next(err) : res.json(user)));
    })
    .catch(next);
});

router.post('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

router.get('/me', (req, res) => {
  res.json(req.user);
});

router.post('/save-stripe-token', (req, res, next) => {
  const tokenId = req.body.id;
  const charge = stripe.charges.create({
    amount: 999,
    currency: 'usd',
    description: 'Example charge',
    source: tokenId,
  }, postStripeCharge(res));
});

router.use('/google', require('./google'));

