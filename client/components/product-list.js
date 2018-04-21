import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProductListItem from './product-list-item';

export const ProductList = (props) => {
  return (
    <div className="productList" >
      { props.products.map(product => <ProductListItem key={product.id} product={product} />) }
    </div>
  );
};

const mapStateToProps = (state) => ({ products: state.products });

export default connect(mapStateToProps)(ProductList);

/**
 * PROP TYPES
 */
ProductList.propTypes = {
  products: PropTypes.array,
};

ProductList.defaultProps = {
  products: [],
};
