
export const getOrderOnUser = (searchOrderId, userObj) => {
  return userObj.orders ? userObj.orders.filter(order => (order.id === searchOrderId))[0] : { products: [] };
};

export const getProductIdsOnOrder = order => {
  console.log(order);
  return order.products ? order.products.map(prod => prod.id) : null;
};

export const getProductQuantitiesOnOrder = order => {
  console.log(order);
  return order.products ? order.products.map(prod => prod.order_product.quantity).reduce((agg, cur) => {
    agg += cur;
    return agg;
  }) : null;
};

export const getProductOnUserOrder = (userObj, orderId, searchProdId) => {
  if (getOrderOnUser(orderId, userObj).products) {
    return getOrderOnUser(orderId, userObj).products.find(prod => prod.id === searchProdId);
  }
  return null;
};