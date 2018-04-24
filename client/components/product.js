/* eslint-disable max-len */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { postProd_OrderThunker, postOrderThunker, signUpGuest, updateQuantityThunk, fieldEditUpdateOrderQuantity } from '../store';

export class productComponent extends Component {
  constructor(props) {
    super(props);
    this.quantities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  }

  render() {
    const { product } = this.props;
    let { cartId, user } = this.props;

    const getOrderOnUser = (searchOrderId, userObj) => {
      return userObj.orders ? userObj.orders.filter(order => (order.id === searchOrderId))[0] : null;
    };

    const getProductIdsOnOrder = order => {
      return order.products ? order.products.map(prod => prod.id) : null;
    };

    const getProductOnUserOrder = (userObj, orderId, searchProdId) => {
      if (getOrderOnUser(orderId, userObj).products) {
        return getOrderOnUser(orderId, userObj).products.find(prod => prod.id === searchProdId);
      }
      return null;
    };

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
            if (Object.keys(user).length === 0 && user.constructor === Object) {
              const response = await this.props.handleCreateGuest(event);
              user = { response };
            }
            if (!cartId) {
              const newCart = await this.props.handleCreateCart(event, user.id);
              cartId = newCart.order.id;
            }
            this.props.handleAddToCart(event, product.price, cartId, product.id);
          }}
          >
            <select
              name="quantity"
              value={this.props.selectedQuantity}
              onChange={this.props.handleChange}
            >
              {this.quantities.map(quantity => <option key={quantity}>{quantity}</option>)}
            </select>
            { cartId && getProductIdsOnOrder(getOrderOnUser(cartId, user)).includes(product.id) ?
              <button onClick={event => {
                this.props.handleQuantityUpdate(event, cartId, product.id, this.props.selectedQuantity);
              }}
              >Update quantity in cart (current: {
                getProductOnUserOrder(user, cartId, product.id).order_product.quantity
              })
              </button> :
              <button type="submit">Add to cart</button>
            }
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

const mapStateToProps = (state, ownProps) => {
  const userOrders = state.user.orders;
  return {
    product: state.products.find(prod => Number(prod.id) === Number(ownProps.match.params.id)),
    user: state.user,
    cartId: userOrders &&
            userOrders.length &&
            userOrders[userOrders.length - 1].status === 'CART' ? userOrders[userOrders.length - 1].id : 0,
    selectedQuantity: state.userInput.singleProduct.quantity,
  };
};

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
    handleCreateGuest(event) {
      event.preventDefault();
      const password = 'fred';
      const firstName = 'GUEST';
      const lastName = 'USER';
      return dispatch(signUpGuest(firstName, lastName, password));
    },
    handleQuantityUpdate(event, orderId, prodId, newQty) {
      event.preventDefault();
      return dispatch(updateQuantityThunk(orderId, prodId, newQty));
    },
    handleChange(event) {
      switch (event.target.name) {
        case 'quantity':
          dispatch(fieldEditUpdateOrderQuantity(event.target.value));
          break;
        default:
          break;
      }
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
