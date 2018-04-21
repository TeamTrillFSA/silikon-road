/* eslint-disable max-len */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { postProd_OrderThunker } from '../store';

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
          <form onSubmit={(event) => this.props.handleSubmit(event, this.props.product.price, this.props.user.id, this.props.product.id)}>
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
  cartId: state.user.orders && state.user.orders[state.user.orders.length - 1].status === 'CART' ? state.user.orders[state.user.orders.length - 1].id : 0,
});

const mapDispatchToProps = dispatch => {
  return {
    handleSubmit(event, price, orderId, productId) {
      event.preventDefault();
      const quantity = Number(event.target[0].value);
      dispatch(postProd_OrderThunker(price, quantity, orderId, productId));
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
