import axios from 'axios';

/**
 * ACTION TYPES
 */
const POST_ORDER = 'POST_ORDER';
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


/**
 * THUNK CREATORS
 */

export const postOrderThunker = (status, userId, addressId) =>
  dispatch =>
    axios.post('/api/orders', { status, userId, addressId })
      .then(res =>
        dispatch(postOrder(res.data)))
      .catch(err => console.error(err));


/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case POST_ORDER:
      return action.order;
    default:
      return state;
  }
}
