//const db = require('../db');
const { Order, Product, User, OrderProduct } = require('./models');

function seedDb () {
  let firstOrder;
  Order.create({
    status: 'CART'
  })
  .then( (order) => {
    firstOrder = order;
    Product.create({
        name: 'Killer GPU',
        price: 300000,
        description: 'This thing will kill you, but in a good way.'
      })
      .then( product => {
        OrderProduct.create({
          productId: product.id,
          orderId: 1,
          quantity: 1,
          price: product.price
        })
      })
  })
  .then( () => {
    Product.create({
        name: 'Black Magic Monitor',
        price: 200000,
        description: 'Amazeballs awaits! Feast your eyes.'
      })
      .then( product => {
        OrderProduct.create({
          productId: product.id,
          orderId: 1,
          quantity: 2,
          price: product.price
        })
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
  .then( () => {
    return User.create({
      firstName: 'Fred',
      lastName: 'Ma',
      email: 'fred@fred.fred',
      password: 'fred',
      isGuest: false
    })
  })
  .then( (resUser) => {
    firstOrder.setUser(resUser)
  })
  // .then( () => {
  //   Order.findById(1)
  //     .then( order => {
  //       order.update({
  //         status: 'PROCESSING'
  //       })
  //     })
  // })
}

module.exports = seedDb;
