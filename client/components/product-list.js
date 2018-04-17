import React from 'react';
import {connect} from 'react-redux';
import ProductListItem from './product-list-item';

const productList = (props) => {
  console.log('ENTERED THE LIST')
  return (
    <div style={listStyle}>
    { props.products.map(product => <ProductListItem key={product.id} product={product} />) }
    </div>
  );
}

const listStyle = {
  color: 'red',
  //display: 'inline-grid',
  //for some reason, this line^ 
  //seems to actually mess everything up
  gridGap: '50px'
};


const mapStateToProps = (state) => ({ products: state.products });

export default connect(mapStateToProps)(productList);

