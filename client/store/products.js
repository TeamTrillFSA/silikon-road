import axios from 'axios'
//import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';

/**
 * INITIAL STATE
 */
const initialState = [];

/**
 * ACTION CREATORS
 */
export const getAllProducts = products => ({
  type: GET_ALL_PRODUCTS,
  products
})


/**
 * THUNK CREATORS
 */

export const fetchAllProducts = () =>
  dispatch =>
    axios.get('/api/products')
      .then(res =>
        dispatch(getAllProducts(res.data)))
      .catch(err => console.log(err))


/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return action.products
    default:
      return state
  }
}
