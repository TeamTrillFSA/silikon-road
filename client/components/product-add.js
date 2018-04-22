/* eslint-disable max-len */

import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  fieldEditAddProductName,
  fieldEditAddProductPrice,
  fieldEditAddProductDesc,
  fieldEditAddProductImage,
  addNewProductThunk,
} from '../store';

export const AddProduct = props => {
  const nameTaken = props.productNames.includes(props.userInput.name.value);

  if (!props.user.id || props.user.isGuest) {
    return <p>You must be a registered user to add a product.</p>;
  }
  return (
    <div>
      <h2>Add Your Product</h2>
      <form onSubmit={event => props.handleSubmit(event, props.userInput, props.user)}>
        <label htmlFor="addProduct_input_name">
          Product Name
          <input
            id="addProduct_input_name"
            name="name"
            type="text"
            value={props.userInput.name.value}
            onChange={props.handleChange}
            required
          />
          { nameTaken ?
            <span id="nameTaken">That product name has already been taken - please choose another.</span>
            : null }
        </label>
        <label htmlFor="addProduct_input_price">
          Product Price
          <input
            id="addProduct_input_price"
            name="price"
            type="text"
            value={props.userInput.price.value}
            onChange={props.handleChange}
            required
          />
        </label>
        <label htmlFor="addProduct_input_desc">
          Product Description
          <input
            id="addProduct_input_desc"
            name="description"
            type="text"
            value={props.userInput.description.value}
            onChange={props.handleChange}
            required
          />
        </label>
        <label htmlFor="addProduct_input_imageUrl">
          Product Image URL
          <input
            id="addProduct_input_imageUrl"
            name="imageUrl"
            type="text"
            value={props.userInput.imageUrl.value}
            onChange={props.handleChange}
            required
          />
        </label>
        <button
          type="submit"
          disabled={nameTaken ? 'disabled' : false}
        >Submit
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user,
  userInput: state.userInput.addProduct,
  productNames: state.products.map(product => product.name),
});

const mapDispatchToProps = dispatch => ({
  handleSubmit(event, inputValues, user) {
    event.preventDefault();
    dispatch(addNewProductThunk({
      name: inputValues.name.value,
      price: inputValues.price.value,
      description: inputValues.description.value,
      imageUrl: inputValues.imageUrl.value,
      userId: user.id,
    }));
  },
  handleChange(event) {
    switch (event.target.name) {
      case 'name':
        dispatch(fieldEditAddProductName(event.target.value));
        break;
      case 'price':
        dispatch(fieldEditAddProductPrice(event.target.value));
        break;
      case 'description':
        dispatch(fieldEditAddProductDesc(event.target.value));
        break;
      case 'imageUrl':
        dispatch(fieldEditAddProductImage(event.target.value));
        break;
      default:
        break;
    }
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddProduct));
