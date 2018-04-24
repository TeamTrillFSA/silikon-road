import axios from 'axios';

/**
 * ACTION TYPES
 */
const EDIT_ADDRESS = 'EDIT_ADDRESS';
const POST_ADDRESS = 'POST_ADDRESS';
/**
 * INITIAL STATE
 */
const initialState = {
    street: '',
    city: '',
    state: '',
    zip: '',
};

/**
 * ACTION CREATORS
 */
export const editAddress = addressObj => ({
  type: EDIT_ADDRESS,
  addressObj,
});

export const postAddress = addressObj => ({
  type: POST_ADDRESS,
  addressObj,
});


/**
 * THUNK CREATORS
 */

export const postAddressThunker = ({ street, city, state, zip},  userId) =>
  dispatch =>
    axios.post('/api/addresses', { street, city, state, zip, userId })
      .then(res => 
        dispatch(postAddress(res.data)))
      .catch(err => console.error(err));


/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case POST_ADDRESS:
      return Object.assign({}, state, action.addressObj)
    case EDIT_ADDRESS:
      return Object.assign({}, state, action.addressObj)
    default:
      return state;
  }
}
