import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ProductList } from './product-list';
import { editAddress, postAddressThunker, putOrderThunker } from '../store';

/**
 * COMPONENT
 */
export const Home = (props) => {
  return (
    <div>
        <div>
            <h1>Checkout!</h1>
            <h2>Your Order:</h2>
        </div>
        <form onSubmit={event => props.handleSubmit(event, props.address, props.userId, props.cartId)} >
            <div>
                <h3>Address Information: (If you don't put in the right information, you don't get your products)</h3>
                <label>
                  Street Address: 
                  <input 
                    name="street"
                    type="text"
                    onChange={props.handleChange}
                    required
                  />
                </label>
                <label>
                  City: 
                  <input 
                    name="city"
                    type="text"
                    onChange={props.handleChange}
                    required
                  />
                </label>
                <label>
                  State: 
                  <input 
                    name="state"
                    type="text"
                    onChange={props.handleChange}
                    required
                  />
                </label>
                <label>
                  ZIP code (only first 5): 
                  <input 
                    name="zip"
                    type="text"
                    onChange={props.handleChange}
                    required
                  />
                </label>
            </div>
            <div>
                <h3>Payment Information:</h3>
            </div>
            <button
              type="submit"
            >Submit
            </button>
        </form>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapStateToProps = (state) => {
  return {
    userId: state.user.id,
    address: state.address,
    orders: state.user.orders,
    cartId: state.user.orders && state.user.orders.length && state.user.orders[state.user.orders.length - 1].status === 'CART' ? state.user.orders[state.user.orders.length - 1].id : 0,
  };
};

const mapDispatchToProps = dispatch => ({
  handleChange(event) {
    event.preventDefault();
    dispatch(editAddress( { [event.target.name]: event.target.value }));
  },
  async handleSubmit(event, address, userId, orderId) {
    event.preventDefault();
    const response = await dispatch(postAddressThunker(address, userId));
    const addressId = response.addressObj.id;
    const status = 'PROCESSING';
    dispatch(putOrderThunker(status, orderId, addressId));
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);

/**
 * PROP TYPES
 */
Home.propTypes = {
  newProducts: PropTypes.array,
  saleProducts: PropTypes.array,
};
