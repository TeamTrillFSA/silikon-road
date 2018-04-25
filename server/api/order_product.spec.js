/* global describe beforeEach it */
/* eslint-disable no-shadow */

const { expect } = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');

const order_product = db.model('order_product');
const order = db.model('order');
const product = db.model('product');

describe('order_product routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  // POST route
  describe('/api/order_product/', () => {
    const name = 'secretName';
    const price = 2000;
    const description = 'This is the description';

    beforeEach(() => {
      return order.create({ })
        .then(() => {
          return product.create({ name, price, description });
        });
    });

    it('POST /api/order_product', () => {
      const quantity = 1;
      const price = 100;
      const orderId = 1;
      const productId = 1;
      return request(app)
        .post('/login')
        .send({ email: 'fred@silikonroad.com', password: 'fred' })
        .end((err, res) => {
          return request(app).post('/api/order_product')
            .send({ price, quantity, orderId, productId })
            .expect(201)
            .end((err, res) => {
              expect(res.body.quantity).to.be.equal(1);
              expect(res.body.orderId).to.be.equal(1);
              expect(res.body.productId).to.be.equal(1);
              expect(Object.keys(res.body).length).to.be.equal(6);
            });
        });
    });
  });
});
