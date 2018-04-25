/* global describe beforeEach it */
/* eslint-disable no-shadow */

const { expect } = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');

const Order = db.model('order');

describe('Order routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  // POST route
  describe('/api/orders/', () => {
    it('POST /api/orders', () => {
      return request(app)
        .post('/login')
        .send({ email: 'fred@silikonroad.com', password: 'fred' })
        .end((err, res) => {
          return request(app)
            .post('/api/orders')
            .send({ user: { isAdmin: true } })
            .expect(201)
            .end((err, res) => {
              expect(res.body.status).to.be.equal('CART');
              expect(res.body.userId).to.be.equal(null);
              expect(res.body.addressId).to.be.equal(null);
              expect(Object.keys(res.body).length).to.be.equal(6);
            });
        });
    });
  });

  // GET by Id route
  describe('/api/orders/', () => {
    beforeEach(() => {
      return Order.create();
    });

    it('It\'s legit impossible to GET /api/orders/:id', () => {
      return request(app)
        .get('/api/orders/1')
        .send({ user: { id: 1 } })
        .expect(403);
    });
  });
});
