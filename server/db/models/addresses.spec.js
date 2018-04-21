/* global describe beforeEach it */

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const db = require('../index');

chai.use(chaiAsPromised);
const { assert } = chai;
const Address = db.model('address');
const { ValidationError } = require('sequelize');

describe('Address model', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });
  describe('validations', () => {
    it('throws an error if street name is empty', () => {
      return assert.isRejected(Address.create({
        city: 'Orlando',
        state: 'FL',
        zip: '32825',
      }), ValidationError);
    });

    it('throws an error if city is empty', () => {
      return assert.isRejected(Address.create({
        street: '625 Heron Bay Dr',
        state: 'FL',
        zip: '32825',
      }), ValidationError);
    });

    it('throws an error if state is empty', () => {
      return assert.isRejected(Address.create({
        street: '625 Heron Bay Dr',
        city: 'Orlando',
        zip: '32825',
      }), ValidationError);
    });

    it('throws an error if zip is empty', () => {
      return assert.isRejected(Address.create({
        street: '625 Heron Bay Dr',
        city: 'Orlando',
        state: 'FL',
      }), ValidationError);
    });

    it('throws an error if zip is not a 5 digit number', () => {
      return assert.isRejected(Address.create({
        street: '625 Heron Bay Dr',
        city: 'Orlando',
        state: 'FL',
        zip: '0281',
      }), ValidationError);
    });
  });

  describe('associations', () => {
    it('has a userId column, meaning Address belongs to User', () => {
      return Address.create({
        street: '625 Heron Bay Dr',
        city: 'Orlando',
        state: 'FL',
        zip: '32825',
      })
        .then(address => assert.equal(address.userId, null));
    });
  });
});
