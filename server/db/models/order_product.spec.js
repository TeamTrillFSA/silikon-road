/* global describe beforeEach it */

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const db = require('../index');

chai.use(chaiAsPromised);
const { assert } = chai;
const Order = db.model('order');
const Product = db.model('product');
const OrderProduct = db.model('order_product');
const { ValidationError, DatabaseError } = require('sequelize');

describe('OrderProduct model (join table between Order and Product)', () => {
  beforeEach(() => {
    return db.sync({ force: true })
      .then(() => {
        return Order.create();
      })
      .then(() => {
        return Product.create({
          name: 'DPRK Warhead Processor',
          price: 7000000,
          description: 'Forbiddenly fun!',
        });
      });
  });
  describe('validations', () => {
    it('throws an error if quantity is empty', () => {
      return assert.isRejected(OrderProduct.create(), ValidationError);
    });
  });
  describe('associations', () => {
    it('throws an error if orderId is null', () => {
      return assert.isRejected(OrderProduct.create({
        productId: 1,
        quantity: 1,
      }), DatabaseError);
    });

    it('throws an error if productId is null', () => {
      return assert.isRejected(OrderProduct.create({
        orderId: 1,
        quantity: 1,
      }), DatabaseError);
    });

    it('throws an error if price is negative', () => {
      return assert.isRejected(OrderProduct.create({
        orderId: 1,
        quantity: 1,
        price: -1,
      }), ValidationError);
    });
  });
});
