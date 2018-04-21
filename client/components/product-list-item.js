import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProductListItem = ({ product }) => {
  return (
    <div className="productListItem">
      <Link to={`/products/${product.id}`}>
        <h3>{product.name}</h3>
        <span>Price: {product.price}</span>
        <img src={product.imageUrl} height="100" width="100" />
        <p>Description: {product.description}</p>
      </Link>
    </div>
  );
};

export default ProductListItem;

/**
 * PROP TYPES
 */
ProductListItem.propTypes = {
  product: PropTypes.object,
};

ProductListItem.defaultProps = {
  product: {
    name: '',
    price: 0,
    imageUrl: '',
    description: '',
  },
};
