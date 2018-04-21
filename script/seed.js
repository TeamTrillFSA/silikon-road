/* eslint-disable no-console */

const db = require('../server/db');
const faker = require('faker');
const { Order, Product, User, OrderProduct, Address } = require('../server/db/models');

// This will be the basis for a quasi-random assortment of orders.
const statuses = Array(12);
statuses.fill('CART', 0, 12);

// Create one admin user:
const users = [{
  firstName: 'Fred',
  lastName: 'Ma',
  email: 'fred@silikonroad.com',
  password: 'fred',
  isGuest: false,
  isAdmin: true,
}];

// Create a dozen additional users; half "true" users with accounts; the other half guest users.
for (let i = 0; i < 6; i++) {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  users.push({
    firstName,
    lastName,
    email: firstName + '.' + lastName + '@gmail.com',
    password: 'fred',
    isGuest: false,
  });
  users.push({
    firstName: 'GUEST',
    lastName: 'USER',
    email: null,
    password: 'fred',
    isGuest: true,
  });
}

const addresses = [];

for (let i = 0; i < 12; i++) {
  addresses.push({
    street: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.state(),
    zip: faker.address.zipCode().slice(0, 5),
  });
}

const products = [
  {
    name: 'Killer GPU',
    price: 300000,
    description: 'This thing will kill you, but in a good way.',
    tags: ['sale', 'gamer'],
  },
  {
    name: 'Black Magic Monitor',
    price: 200000,
    description: 'Amazeballs awaits! Feast your eyes.',
    tags: ['sale', 'gamer'],
  },
  {
    name: '$lave RAM',
    price: 100000,
    description: 'Tons of memory, all day, every day.',
    tags: ['sale'],
  },
  {
    name: 'Boingo Motherboard',
    price: 400000,
    description: 'The mother of all motherboards.',
    tags: ['sale'],
  },
  {
    name: 'Overclocked AF Grafixxx Card',
    price: 200000,
    description: 'Beware, this thing is beasty.',
    tags: ['new'],
  },
  {
    name: 'North Korean Nuclear Warhead Chip',
    price: 2000000,
    description: 'No joke!',
    tags: ['new', 'superillegal'],
  },
  {
    name: 'Google Self-Driving Car Motherboard',
    price: 1000000,
    description: 'This thing is pretty smart.',
    tags: ['new'],
  },
  {
    name: 'NASA Mission Control Backup Mainframe',
    price: 7000000,
    description: 'Impress your friends.',
    tags: ['new', 'superillegal'],
  },
];

// We assume that all orders past the 'CART' status have been purchased
// and will have a final purchase price. Otherwise the price is null and
// will not be set until purchase.

const orderProducts = [
  {
    productId: 2,
    orderId: 1,
    quantity: 1,
    price: null,
  },
  {
    productId: 3,
    orderId: 1,
    quantity: 1,
    price: null,
  },
  {
    productId: 4,
    orderId: 2,
    quantity: 2,
    price: null,
  },
  {
    productId: 8,
    orderId: 3,
    quantity: 1,
    price: null,
  },
  {
    productId: 7,
    orderId: 4,
    quantity: 1,
    price: null,
  },
  {
    productId: 5,
    orderId: 5,
    quantity: 1,
    price: null,
  },
  {
    productId: 2,
    orderId: 6,
    quantity: 3,
    price: null,
  },
  {
    productId: 8,
    orderId: 7,
    quantity: 1,
    price: null,
  },
  {
    productId: 1,
    orderId: 7,
    quantity: 2,
    price: null,
  },
  {
    productId: 1,
    orderId: 8,
    quantity: 2,
    price: null,
  },
  {
    productId: 3,
    orderId: 9,
    quantity: 1,
    price: null,
  },
  {
    productId: 6,
    orderId: 10,
    quantity: 1,
    price: null,
  },
  {
    productId: 3,
    orderId: 11,
    quantity: 1,
    price: null,
  },
  {
    productId: 8,
    orderId: 12,
    quantity: 2,
    price: null,
  },
];

async function seed() {
  let i;

  await db.sync({ force: true });

  await Promise.all(users.map(user => { return User.create(user); }));
  await Promise.all(addresses.map(address => { return Address.create(address); }));
  const orders = await Promise.all(statuses.map(status => { return Order.create(status); }));

  i = 1;
  await Promise.all(orders.map(order => { return order.setUser(i++); }));

  await Promise.all(products.map(product => { return Product.create(product); }));
  await Promise.all(orderProducts.map(orderProduct => {
    return OrderProduct.create(orderProduct);
  }));

  console.log('seeded successfully');
}

seed()
  .catch(err => {
    console.error(err.message);
    console.error(err.stack);
    process.exitCode = 1;
  })
  .then(() => {
    console.log('closing db connection');
    db.close();
    console.log('db connection closed');
  });

console.log('seeding...');

module.exports = seed;
