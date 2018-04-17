//const db = require('../db');
const { Order, Product } = require('./models');

function seedDb () {
  Order.create({
    status: 'CART',
    billingAddrName: 'Jeff Gore',
    billingAddrStreet: '625 Heron Bay Dr',
    billingAddrCity: 'Orlando',
    billingAddrState: 'FL',
    billingAddrZIP: '32825',
    shippingAddrName: 'Jeff Gore',
    shippingAddrStreet: '1825 Mountain St.',
    shippingAddrCity: 'Philadelphia',
    shippingAddrState: 'PA',
    shippingAddrZIP: '19122'
  })
  .then( () => {
    Product.create({
        name: 'Killer GPU',
        price: 300000,
        description: 'This thing will kill you, but in a good way.'
      })
      .then( product => {
        product.addOrder(1);
      })
  })
  .then( () => {
    Product.create({
        name: 'Black Magic Monitor',
        price: 200000,
        description: 'Amazeballs awaits! Feast your eyes.'
      })
      .then( product => {
        product.addOrder(1);
      })
  })
  .then( () => {
    Product.create({
        name: '$lave RAM',
        price: 100000,
        description: 'Tons of memory, all day, every day.'
      })
  })
  .then( () => {
    Product.create({
        name: 'Boingo Motherboard',
        price: 400000,
        description: 'The mother of all motherboards.'
      })
  })
}

module.exports = seedDb;
