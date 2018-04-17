import React from 'react';

const ProductListItem = (props) => {
  const product = props.product;

  return (
    <div style={listItemStyle} >
      <h3>Name: {product && product.name}</h3>
      <p>{product && product.description}</p>
    </div>
  );
};

const listItemStyle = {
  backgroundColor: '#BBB',
  display: 'inline-grid',
  width: '200px',
  height: '200px',
  gridGap: '50px'
}

export default ProductListItem;