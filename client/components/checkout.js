import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ProductList } from './product-list';

/**
 * COMPONENT
 */
export const Home = (props) => {
  console.log(">>>>>>>>>>>", props.order);
  console.log("<><><><><>", props.cartId);
  console.log(props);
  return (
    <div>
        <div>
            <h1>Checkout!</h1>
            <h2>Your Order:</h2>
        </div>
        <form>
            <div>
                <h3>Address Information:</h3>
            </div>
            <div>
                <h3>Payment Information:</h3>
            </div>  
        </form>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapStateToProps = (state) => {
  return {
    order: state.user.orders,
    cartId: state.cartId, // why not work??
  };
};

export default connect(mapStateToProps)(Home);

/**
 * PROP TYPES
 */
Home.propTypes = {
  newProducts: PropTypes.array,
  saleProducts: PropTypes.array,
};
