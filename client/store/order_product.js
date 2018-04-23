import axios from 'axios';
import { me } from './user';

/**
 * ACTION TYPES
 */
const POST_PRODUCT_TO_ORDER = 'POST_PRODUCT_TO_ORDER';
const UPDATE_ORDER_QTY = 'UPDATE_ORDER_QTY';
/**
 * INITIAL STATE
 */
const initialState = {};

/**
 * ACTION CREATORS
 */
export const postProductToOrder = joinObj => ({
  type: POST_PRODUCT_TO_ORDER,
  joinObj,
});

export const updateOrderQuantity = newQuantity => ({
  type: UPDATE_ORDER_QTY,
  newQuantity,
});
/**
 * THUNK CREATORS
 */

export const postProd_OrderThunker = (price, quantity, orderId, productId) =>
  dispatch =>
    axios.post('/api/order_product', { price, quantity, orderId, productId })
      .then(res =>
        dispatch(postProductToOrder(res.data)))
      .then(() => dispatch(me()))
      .catch(err => console.error(err));

export const updateQuantityThunk = (productId, quantity) =>
  dispatch =>
    axios.put('/api/order_product', { productId, quantity })
      .then(res =>
        dispatch(updateOrderQuantity(res.data.quantity)))
      .then(() => dispatch(me()))
      .catch(err => console.error(err));


/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case POST_PRODUCT_TO_ORDER:
      return action.joinObj;
    case UPDATE_ORDER_QTY:
      return action.newQuantity;
    default:
      return state;
  }
}
