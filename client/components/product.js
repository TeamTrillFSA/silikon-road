/* eslint-disable max-len */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { postProd_OrderThunker, postOrderThunker } from '../store';

export class productComponent extends Component {
  constructor(props) {
    super(props);
    this.quantities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  }

  render() {
    const { product } = this.props;
    return (
      <div>
        <div>
          <h1>{product && product.name}</h1>
          <h3>Price: {product && product.price}</h3>
          <img src={product && product.imageUrl} />
          <br />
          <p>Description: {product && product.description}</p>
          <form onSubmit={async (event) => {
            event.persist();
            let { cartId } = this.props;
            if (!this.props.cartId) {
              const newCart = await this.props.handleCreateCart(event, this.props.user.id);
              cartId = newCart.order.id;
            }
            this.props.handleAddToCart(event, this.props.product.price, cartId, this.props.product.id);
          }}
          >
            <select name="quantity">
              {this.quantities.map(quantity => <option key={quantity}>{quantity}</option>)}
            </select>
            <button type="submit">Add to cart</button>
          </form>
        </div>
        <hr />
        <div>
          <h2>Reviews</h2>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  product: state.products.find(prod => Number(prod.id) === Number(ownProps.match.params.id)),
  user: state.user,
  cartId: state.user.orders && state.user.orders.length && state.user.orders[state.user.orders.length - 1].status === 'CART' ? state.user.orders[state.user.orders.length - 1].id : 0,
});

const mapDispatchToProps = dispatch => {
  return {
    handleAddToCart(event, price, orderId, productId) {
      event.preventDefault();
      const quantity = Number(event.target[0].value);
      dispatch(postProd_OrderThunker(price, quantity, orderId, productId));
    },
    handleCreateCart(event, userId) {
      event.preventDefault();
      const status = 'CART';
      const addressId = null;
      return dispatch(postOrderThunker(status, userId, addressId));
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(productComponent));

/**
 * PROP TYPES
 */
productComponent.propTypes = {
  product: PropTypes.object,
};

productComponent.defaultProps = {
  product: {
    name: '',
    price: 0,
    imageUrl: '',
    description: '',
  },
};
