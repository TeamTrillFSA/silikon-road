import axios from 'axios';
import { me } from './user';

/**
 * ACTION TYPES
 */
const POST_ORDER = 'POST_ORDER';
const PUT_ORDER = 'PUT_ORDER';
/**
 * INITIAL STATE
 */
const initialState = {};

/**
 * ACTION CREATORS
 */
export const postOrder = order => ({
  type: POST_ORDER,
  order,
});

export const putOrder = order => ({
  type: PUT_ORDER,
  order,
});

/**
 * THUNK CREATORS
 */

export const postOrderThunker = (status, userId, addressId) =>
  dispatch =>
    axios.post('/api/orders', { status, userId, addressId })
      .then(res =>
        dispatch(postOrder(res.data)))
      .then(() => dispatch(me()))
      .catch(err => console.error(err));

export const putOrderThunker = (status, orderId, addressId) =>
  dispatch =>
    axios.put(`/api/orders/${orderId}`, { status, addressId })
      .then(res =>
        dispatch(postOrder(res.data)))
      .then(() => dispatch(me()))
      .catch(err => console.error(err));


/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case POST_ORDER:
      return action.order;
    case PUT_ORDER:
      return action.order;
    default:
      return state;
  }
}
