import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const range = (end) => [...Array(end)].map((_, i) => i);

export const Cart = ({ order, tblWidthStyle1, tblWidthStyle2 }) => {
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
                  <span>Shipping Firm: Silikon Road LLC</span>
                  <button>Delete</button>
                </td>
                <td>{product.price}</td>
                <td>
                  <select>
                    {range(10).map(number => <option key={number}>{number}</option>)}
                  </select>
                </td>
              </tr>))}
          </tbody>
        </table>
      </div>
      <div id="checkoutSection">
        <button>Proceed to Checkout</button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  order: state.user.orders && state.user.orders.length ?
    state.user.orders[state.user.orders.length - 1]
    : {},
  tblWidthStyle1: {
    width: '15%',
  },
  tblWidthStyle2: {
    width: '55%',
  },
});

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
