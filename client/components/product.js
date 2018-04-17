import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

const productComponent = (props) => {
  const product = props.products.find(id => id === props.match.params.id);

  return (
    <div>
      <div>
        <h1>{product.name}</h1>
        <h3>Price: {product.price}</h3>
        <br />
        <p>Description: {product.description}</p>
        <button>Buy</button>
      </div>
      <hr />
      <div>
        <h2>Reviews</h2>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({ products: state.products })

export default withRouter(connect(mapStateToProps)(productComponent));
