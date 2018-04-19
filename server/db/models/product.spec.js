const {expect} = require('chai');
const db = require('../index');
const Product = db.model('product');

describe('Product model', () => {
  describe('validations', () => {
    beforeEach(() => {
      return db.sync({force: true});
    });

    it('throws an error if name is empty', (done) => {
      Product.create()
        .then(() => expect(true).to.be.equal(false))
        .catch(err => expect(err.name).to.be.equal('SequelizeValidationError'))
        .finally(done);
    });

    it('throws an error if price is empty', (done) => {
      Product.create({ name: 'Name' })
        .then(() => expect(true).to.be.equal(false))
        .catch(err => expect(err.name).to.be.equal('SequelizeValidationError'))
        .finally(done);
    });

    it('throws an error if description is empty', (done) => {
      Product.create({ name: 'Name', price: 10 })
        .then(() => expect(true).to.be.equal(false))
        .catch(err => expect(err.name).to.be.equal('SequelizeValidationError'))
        .finally(done);
    });

    it('if no url is given the default url is "http://www.agecomputer.org/images/computerhappy.png"', (done) => {
      Product.create({ name: 'Name', price: 10, description: 'description' })
        .then(product => expect(product.imageUrl).to.be.equal('http://www.agecomputer.org/images/computerhappy.png'))
        .finally(done);
    });

    it('throws an error if name is not unique', (done) => {
      Product.create({ name: 'Name', price: 10, description: 'description' })
        .then(() => Product.create({ name: 'Name' }))
        .then(() => expect(true).to.be.equal(false))
        .catch(err => expect(err.name).to.be.equal('SequelizeValidationError'))
        .finally(done);
    });
  });
});
