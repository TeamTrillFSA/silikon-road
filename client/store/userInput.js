/**
 * ACTION TYPES
 */
const FIELD_EDIT_ADDPRODUCT_NAME = 'FIELD_EDIT_ADDPRODUCT_NAME';
const FIELD_EDIT_ADDPRODUCT_PRICE = 'FIELD_EDIT_ADDPRODUCT_PRICE';
const FIELD_EDIT_ADDPRODUCT_DESC = 'FIELD_EDIT_ADDPRODUCT_DESC';
const FIELD_EDIT_ADDPRODUCT_IMAGEURL = 'FIELD_EDIT_ADDPRODUCT_IMAGEURL';
const FIELD_EDIT_UPDATE_ORDER_QUANTITY = 'FIELD_EDIT_UPDATE_ORDER_QUANTITY';
const FIELD_CLEAR_AFTER_SUBMISSION = 'FIELD_CLEAR_AFTER_SUBMISSION';

/**
 * INITIAL STATE
 */

const initialState = {
  addProduct: {
    name: '',
    price: '0',
    description: '',
    imageUrl: '',
  },
  singleProduct: {
    quantity: 1,
  },
};
/**
 * ACTION CREATORS
 */

export function fieldEditAddProductName(prodNameField) {
  return {
    type: FIELD_EDIT_ADDPRODUCT_NAME,
    value: prodNameField,
  };
}

export function fieldEditAddProductPrice(prodPriceField) {
  return {
    type: FIELD_EDIT_ADDPRODUCT_PRICE,
    value: prodPriceField,
  };
}

export function fieldEditAddProductDesc(prodDescField) {
  return {
    type: FIELD_EDIT_ADDPRODUCT_DESC,
    value: prodDescField,
  };
}

export function fieldEditAddProductImage(prodImageField) {
  return {
    type: FIELD_EDIT_ADDPRODUCT_IMAGEURL,
    value: prodImageField,
  };
}

export function fieldClearAfterSubmission() {
  return {
    type: FIELD_CLEAR_AFTER_SUBMISSION,
  };
}

export function fieldEditUpdateOrderQuantity(selectedQuantity) {
  return {
    type: FIELD_EDIT_UPDATE_ORDER_QUANTITY,
    value: selectedQuantity,
  };
}
/**
 * REDUCER
 */

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FIELD_EDIT_ADDPRODUCT_NAME:
      return Object.assign({}, state, {
        addProduct: Object.assign({}, state.addProduct, {
          name: action.value,
        }),
      });

    case FIELD_EDIT_ADDPRODUCT_PRICE:
      return Object.assign({}, state, {
        addProduct: Object.assign({}, state.addProduct, {
          price: action.value,
        }),
      });

    case FIELD_EDIT_ADDPRODUCT_DESC:
      return Object.assign({}, state, {
        addProduct: Object.assign({}, state.addProduct, {
          description: action.value,
        }),
      });

    case FIELD_EDIT_ADDPRODUCT_IMAGEURL:
      return Object.assign({}, state, {
        addProduct: Object.assign({}, state.addProduct, {
          imageUrl: action.value,
        }),
      });

    case FIELD_EDIT_UPDATE_ORDER_QUANTITY:
      return Object.assign({}, state, {
        singleProduct: Object.assign({}, state.singleProduct, {
          quantity: action.value,
        }),
      });

    case FIELD_CLEAR_AFTER_SUBMISSION:
      return initialState;

    default:
      return state;
  }
};

export default reducer;
