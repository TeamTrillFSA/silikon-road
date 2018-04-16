import React from 'react';

const ProductListItem = (props) => {
  const { product } = props.product;

  return (
    <div>
      <h3>Name: {product.name}</h3>
      <img src={product.imageUrl} />
      <p>{product.description}</p>
    </div>
  );
};

export default ProductListItem;