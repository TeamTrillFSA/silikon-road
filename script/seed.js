
const db = require('../server/db')
const faker = require('faker')
const { Order, Product, User, OrderProduct } = require('../server/db/models');

const statuses = [
  'CART',
  'PROCESSING',
  'CART',
  'CART',
  'SHIPPED',
  'COMPLETE',
  'CART',
  'CART',
  'CANCELLED',
  'CART',
  'CART',
  'CART'
]

const users = [];

for (let i = 0; i < 12; i++) {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  users.push({
    firstName,
    lastName,
    email: firstName + '.' + lastName + '@gmail.com',
    password: 'fred',
    isGuest: false
  })
}

const products = [
  {
    name: 'Killer GPU',
    price: 300000,
    description: 'This thing will kill you, but in a good way.'
  },
  {
    name: 'Black Magic Monitor',
    price: 200000,
    description: 'Amazeballs awaits! Feast your eyes.'
  },
  {
    name: '$lave RAM',
    price: 100000,
    description: 'Tons of memory, all day, every day.'
  },
  {
    name: 'Boingo Motherboard',
    price: 400000,
    description: 'The mother of all motherboards.'
  },
  {
    name: 'Overclocked AF Grafixxx Card',
    price: 200000,
    description: 'Beware, this thing is beasty.'
  },
  {
    name: 'North Korean Nuclear Warhead Chip',
    price: 2000000,
    description: 'No joke!'
  },
  {
    name: 'Google Self-Driving Car Motherboard',
    price: 1000000,
    description: 'This thing is pretty smart.'
  },
  {
    name: 'NASA Mission Control Backup Mainframe',
    price: 7000000,
    description: 'Impress your friends.'
  },
];

const orderProducts = [
  // 
  // ,
  // 
  // 
  // ,
  // ,
  // 
  // 
  // 
  // 'CART',
  // 'CART',
  // 'CART'

  { // 'CART'
    productId: 2,
    orderId: 1,
    quantity: 1,
    price: null
  },
  {
    productId: 3,
    orderId: 1,
    quantity: 1,
    price: null
  },
  { // 'PROCESSING'
    productId: 4,
    orderId: 2,
    quantity: 2,
    price: 20000
  },
  { // 'CART'
    productId: 8,
    orderId: 3,
    quantity: 1,
    price: null
  },
  { // 'CART'
    productId: 7,
    orderId: 4,
    quantity: 1,
    price: null
  },
  { // 'SHIPPED'
    productId: 5,
    orderId: 5,
    quantity: 1,
    price: 200000
  },
  { // 'COMPLETE'
    productId: 2,
    orderId: 6,
    quantity: 3,
    price: 200000
  },
  { // 'CART'
    productId: 8,
    orderId: 7,
    quantity: 1,
    price: null
  },
  {
    productId: 1,
    orderId: 7,
    quantity: 2,
    price: null
  },
  { // 'CART'
    productId: 1,
    orderId: 8,
    quantity: 2,
    price: null
  },
  { // 'CANCELLED'
    productId: 3,
    orderId: 9,
    quantity: 1,
    price: 100000
  },  
]

function seed () {
  return db.sync({force: true})
    .then( () => {
      return Promise.all(users.map( user => {
        return User.create(user);
      }))
    })
    .then( () => {
      return Promise.all(statuses.map( status => {
        return Order.create({
          status
        });
      }));
    })
    .then( orders => {
      let i = 1;
      return Promise.all(orders.map( order => {
        return order.setUser(i++)
      }));
    })
    .then( () => {
      return Promise.all(products.map( product => {
        return Product.create(product);
      }));
    })
    .then( () => {
      return Promise.all(orderProducts.map(orderProduct => {
        return OrderProduct.create(orderProduct);
      }));
    })
    .catch( err => {
      console.error(err);
    });
}


seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

console.log('seeding...')

module.exports = seed;
