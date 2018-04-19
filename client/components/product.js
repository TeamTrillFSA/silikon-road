import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

export class productComponent extends Component {

  render () {

    const product = this.props.products.find(prod => Number(prod.id) === Number(this.props.match.params.id));

    return (
      <div>
        <div>
          <h1>{product && product.name}</h1>
          <h3>Price: {product && product.price}</h3>
          <img src={product && product.imageUrl} />
          <br />
          <p>Description: {product && product.description}</p>
          <form>
            <select name="quantity">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
              <option>10</option>
            </select>
            <button onClick={this.handleClick}>Add to cart</button>
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

const mapStateToProps = (state) => ({ 
  products: state.products,
  user: state.user,
  cartId: state.user.orders && state.user.orders[state.user.orders.length - 1].status === 'CART' ? state.user.orders[state.user.orders.length - 1].id : 0
});

export default withRouter(connect(mapStateToProps)(productComponent));
