import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export const Cart = ({ order }) => {
  return (
    <div className="cart">

      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {order.products.map(product =>
            (<tr>
              <td>f</td>
              <td>{}</td>
              <td>f</td>
            </tr>))}
        </tbody>
      </table>

    </div>
  );
};

const mapStateToProps = (state) => ({
  order: state.user.orders.find(order => Number(order.id) === state.order.id) });

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
