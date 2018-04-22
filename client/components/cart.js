import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export const Cart = ({ order }) => {
  return (
    <div className="cart">
      {order.products.map(product => <h3>{product.name}</h3>)}
    </div>
  );
};

const mapStateToProps = (state) => ({
  order: state.user.orders.find(order => Number(order.id) === state.order) });

export default connect(mapStateToProps)(Cart);

/**
 * PROP TYPES
 */
Cart.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number,
    status: PropTypes.string,
    products: PropTypes.array,
  }),
};

Cart.defaultProps = {
  order: {
    id: 0,
    status: 'CART',
    products: [],
  },
};
