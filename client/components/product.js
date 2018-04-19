import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

export const productComponent = (props) => {
  const product = props.products.find(prod => Number(prod.id) === Number(props.match.params.id));

  return (
    <div>
      <div>
        <h1>{product && product.name}</h1>
        <h3>Price: {product && product.price}</h3>
        <img src={product && product.imageUrl} />
        <br />
        <p>Description: {product && product.description}</p>
        <button>Add to cart</button>
      </div>
      <hr />
      <div>
        <h2>Reviews</h2>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({ products: state.products, user: state.user });

export default withRouter(connect(mapStateToProps)(productComponent));
