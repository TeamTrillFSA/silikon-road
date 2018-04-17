import React from 'react';
import {connect} from 'react-redux';
import ProductListItem from './product-list-item';

const productList = (props) => {
  console.log('ENTERED THE LIST')
  return (
    <div>
    { props.products.map(product => <ProductListItem key={product.id} product={product} />) }
    </div>
  );
}


const mapStateToProps = (state) => ({ products: state.products });

export default connect(mapStateToProps)(productList);

