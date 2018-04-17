import React from 'react';

const ProductListItem = (props) => {
  const product = props.product;

  return (
    <div className="productListItem">
      <h3>{product && product.name}</h3>
      <img src={product && product.imageUrl} height='100' width='100' />
      <p>{product && product.description}</p>
    </div>
  );
};



export default ProductListItem;