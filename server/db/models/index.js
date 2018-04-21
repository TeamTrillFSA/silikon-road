const User = require('./user');
const Product = require('./product');
const Order = require('./order');
const OrderProduct = require('./order_product');
const Address = require('./address');

/// ASSOCIATIONS

Order.belongsTo(User);
User.hasMany(Order);

Order.belongsTo(Address);
Address.belongsTo(User);

Order.belongsToMany(Product, { through: OrderProduct });
Product.belongsToMany(Order, { through: OrderProduct });

Product.belongsTo(User);

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */


module.exports = {
  User,
  Product,
  Order,
  OrderProduct,
  Address
}
