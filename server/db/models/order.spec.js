import { isNull } from 'util';

/* global describe beforeEach it */

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const db = require('../index');

chai.use(chaiAsPromised);
const { assert } = chai;
const Order = db.model('order');
const { DatabaseError } = require('sequelize');

describe('Order model', () => {

  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('validations', () => {
    it('throws an error if status is not "CART", "PROCESSING", "SHIPPED", "COMPLETE", or "CANCELLED"', () => {
      return assert.isRejected(Order.create({
        status: 'MELTING',
      }), DatabaseError);
    });

    it('assigns the status column a value of "CART" if no value is given', () => {
      return Order.create()
        .then(order => assert.equal(order.status, 'CART'));
    });
  });

  describe('associations', () => {
    it('has a userId column, meaning Order belongs to User', () => {
      return Order.create()
        .then(order => assert.equal(order.userId, null));
    });

    it('has an addressId column, meaning Order belongs to Address', () => {
      return Order.create()
        .then(order => assert.equal(order.addressId, null));
    });
  });
});
