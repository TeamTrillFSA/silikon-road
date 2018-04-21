import axios from 'axios'

/**
 * ACTION TYPES
 */
const POST_PRODUCT_TO_ORDER = 'POST_PRODUCT_TO_ORDER';
/**
 * INITIAL STATE
 */
const initialState = {};

/**
 * ACTION CREATORS
 */
export const postProductToOrder = joinObj => ({
  type: POST_PRODUCT_TO_ORDER,
  joinObj
})


/**
 * THUNK CREATORS
 */

export const postProd_OrderThunker = (price, quantity, orderId, productId) =>
  dispatch =>
    axios.post('/api/order_product', {price, quantity, orderId, productId})
      .then(res =>
        dispatch(postProductToOrder(res.data))) //tried changing from res.data to just res
      .catch(err => console.log(err))


/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case POST_PRODUCT_TO_ORDER:
      return action.joinObj
    default:
      return state
  }
}
