import React from 'react';

const ProductListItem = (props) => {
  const product = props.product;

  return (
    <div>
      <h3>Name: {product && product.name}</h3>
      <img src={product && product.imageUrl} />
      <p>{product && product.description}</p>
    </div>
  );
};

export default ProductListItem;