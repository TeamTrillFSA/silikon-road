import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
const ADD_NEW_PRODUCT = 'ADD_NEW_PRODUCT';

/**
 * INITIAL STATE
 */
const initialState = [];

/**
 * ACTION CREATORS
 */
export const getAllProducts = products => ({
  type: GET_ALL_PRODUCTS,
  products,
});

export const addNewProduct = product => ({
  type: ADD_NEW_PRODUCT,
  product,
});

/**
 * THUNK CREATORS
 */

export const fetchAllProducts = () =>
  dispatch =>
    axios.get('/api/products')
      .then(res =>
        dispatch(getAllProducts(res.data)))
      .catch(err => console.error(err));

export const addNewProductThunk = (product) =>
  dispatch =>
    axios.post('/api/products', product)
      .then(res =>
        dispatch(addNewProduct(res.data)))
      .catch(err => console.error(err));

/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return action.products;
    case ADD_NEW_PRODUCT:
      return [...state, action.product];
    default:
      return state;
  }
}
