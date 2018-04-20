import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {ProductList} from './product-list';

/**
 * COMPONENT
 */
export const UserHome = ({newProducts, saleProducts}) => {
  return (
    <div>
      <div id="newProducts">
        <h1 className="headertext">Hot off the Dark Web</h1>
        <ProductList products={newProducts} />
      </div>
      <div id="saleProducts">
        <h1 className="headertext">Pennies on the Dollar</h1>
        <ProductList products={saleProducts} />
      </div>
    </div>
  );
}

/**
 * CONTAINER
 */
const mapStateToProps = (state) => {
  return {
    newProducts: state.products,
    saleProducts: state.products
  }
}

export default connect(mapStateToProps)(UserHome);

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  newProducts: PropTypes.array,
  saleProducts: PropTypes.array
}
