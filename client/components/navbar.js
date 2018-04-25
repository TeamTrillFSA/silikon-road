import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import { getProductQuantitiesOnOrder, getOrderOnUser } from '../utils';

const Navbar = ({ handleClick, isLoggedIn, loggedInUsername, cartId, user }) => (
  <div>
    <h1>SILIKON ROAD</h1>
    <nav>
      {isLoggedIn ? (
        <div>
          <span>{ `-----${loggedInUsername}-----` }</span>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          { cartId ?
            <Link to="/cart">My Cart ({getProductQuantitiesOnOrder(getOrderOnUser(cartId, user.id))})</Link> : null
          }
          {/* The navbar will show these links after you log in */}
          <a href="#" onClick={handleClick}>
            Logout
          </a>
          <Link to="/products/add">Add a Product</Link>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          { cartId ?
            <Link to="/cart">My Cart ({getProductQuantitiesOnOrder(getOrderOnUser(cartId, user))})</Link> : null
          }
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
);

/**
 * CONTAINER
 */
const mapState = state => {
  const userOrders = state.user.orders;
  return {
    user: state.user,
    isLoggedIn: Object.keys(state.user).length > 0 && !state.user.isGuest,
    loggedInUsername: state.user.email && state.user.firstName,
    cartId: userOrders &&
            userOrders.length &&
            userOrders[userOrders.length - 1].status === 'CART' ? userOrders[userOrders.length - 1].id : 0,
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
