/* global describe beforeEach it */
const {expect} = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const Product = db.model('product');

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true});
  })

  const name = 'ProductName';
  const price = 8;
  const imageUrl = 'http://www.agecomputer.org/images/computerhappy.png';
  const description = 'Product Description';

  describe('/api/products/', () => {
    beforeEach(() => {
      return Product.create({ name, price, imageUrl, description });
    });

    it('GET /api/products', () => {
      return request(app)
        .get('/api/products')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body[0].name).to.be.equal(name);
          expect(res.body[0].price).to.be.equal(price);
          expect(res.body[0].imageUrl).to.be.equal(imageUrl);
          expect(res.body[0].description).to.be.equal(description);
        })
    })
  }) // end describe('/api/products')
}) // end describe('Product routes')
