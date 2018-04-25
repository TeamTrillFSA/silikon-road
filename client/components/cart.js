import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export const Cart = ({ order, cartId, tblWidthStyle1, tblWidthStyle2 }) => {
  if (!cartId) {
    return (<div>Your cart is empty.</div>);
  }
  return (
    <div className="cart">
      <div id="cartTable">
        <table>
          <colgroup>
            <col span="1" style={tblWidthStyle1} />
            <col span="1" style={tblWidthStyle2} />
            <col span="1" style={tblWidthStyle1} />
            <col span="1" style={tblWidthStyle1} />
          </colgroup>
          <thead>
            <tr>
              <th><span className="text-leftalign">Image</span></th>
              <th><span className="text-centeralign">Product</span></th>
              <th><span className="text-leftalign">Price</span></th>
              <th><span className="text-rightalign">Quantity</span></th>
            </tr>
          </thead>
          <tbody>
            {order.products && order.products.map(product => (
              <tr key={product.id}>
                <td><img src={product.imageUrl} width="100" height="100" /></td>
                <td>
                  <span>{product.name}</span>
                </td>
                <td>{product.price}</td>
                <td>{product.order_product.quantity}</td>
              </tr>))}
          </tbody>
        </table>
      </div>
      <div id="checkoutSection">
        <Link to="/checkout"><button>Proceed to Checkout</button></Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const userOrders = state.user.orders;
  return {
    order: userOrders && userOrders.length ?
      userOrders[userOrders.length - 1]
      : {},
    cartId: userOrders &&
      userOrders.length &&
      userOrders[userOrders.length - 1].status === 'CART' ? userOrders[userOrders.length - 1].id : 0,
    tblWidthStyle1: {
      width: '15%',
    },
    tblWidthStyle2: {
      width: '55%',
    },
  };
};

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
