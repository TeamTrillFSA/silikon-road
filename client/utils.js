
export const getOrderOnUser = (searchOrderId, userObj) => {
  return userObj.orders ? userObj.orders.filter(order => (order.id === searchOrderId))[0] : { products: [] };
};

export const getProductIdsOnOrder = order => {
  return order.products ? order.products.map(prod => prod.id) : null;
};

export const getProductQuantitiesOnOrder = order => {
  return order.products.length ? order.products.map(prod => prod.order_product.quantity).reduce((agg, cur) => {
    agg += cur;
    return agg;
  }, 0) : null;
};

export const getTotalOrderValue = order => {
  return order.products.length ? order.products.map(prod => prod.order_product.price).reduce((agg, cur) => {
    agg += cur;
    return agg;
  }, 0) : 0;
};

export const getProductOnUserOrder = (userObj, orderId, searchProdId) => {
  if (getOrderOnUser(orderId, userObj).products) {
    return getOrderOnUser(orderId, userObj).products.find(prod => prod.id === searchProdId);
  }
  return null;
};