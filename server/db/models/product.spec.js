const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const assert = chai.assert;

const db = require('../index');
const Product = db.model('product');

const {ValidationError} = require('sequelize');

describe('Product model', () => {
  describe('validations', () => {
    beforeEach(() => {
      return db.sync({force: true});
    });

    it('throws an error if name is empty', () => {
      return assert.isRejected(Product.create(), ValidationError);
    });

    it('throws an error if price is empty', () => {
      return assert.isRejected(Product.create({ name: 'Name' }), ValidationError);
    });

    it('throws an error if description is empty', () => {
      return assert.isRejected(Product.create({ name: 'Name', price: 10 }), ValidationError);
    });

    it('if no url is given the default url is "http://www.agecomputer.org/images/computerhappy.png"', () => {
      return Product.create({ name: 'Name', price: 10, description: 'description' })
        .then(product => assert.equal(product.imageUrl, 'http://www.agecomputer.org/images/computerhappy.png'))
    });

    it('throws an error if name is not unique', () => {
      return assert.isRejected(Product.create({ name: 'Name', price: 10, description: 'description' }).then(() => Product.create({ name: 'Name' })), ValidationError);
    });
  });
});
