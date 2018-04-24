
export const getOrderOnUser = (searchOrderId, userObj) => {
  return userObj.orders ? userObj.orders.filter(order => (order.id === searchOrderId))[0] : null;
};

export const getProductIdsOnOrder = order => {
  return order.products ? order.products.map(prod => prod.id) : null;
};

export const getProductOnUserOrder = (userObj, orderId, searchProdId) => {
  if (getOrderOnUser(orderId, userObj).products) {
    return getOrderOnUser(orderId, userObj).products.find(prod => prod.id === searchProdId);
  }
  return null;
};