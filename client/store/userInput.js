/**
 * ACTION TYPES
 */
const FIELD_EDIT_ADDPRODUCT_NAME = 'FIELD_EDIT_ADDPRODUCT_NAME';
const FIELD_EDIT_ADDPRODUCT_PRICE = 'FIELD_EDIT_ADDPRODUCT_PRICE';
const FIELD_EDIT_ADDPRODUCT_DESC = 'FIELD_EDIT_ADDPRODUCT_DESC';
const FIELD_EDIT_ADDPRODUCT_IMAGEURL = 'FIELD_EDIT_ADDPRODUCT_IMAGEURL';
/**
 * INITIAL STATE
 */

const initialState = {
  addProduct: {
    name: {
      value: '',
      untouched: true,
    },
    price: {
      value: '0',
      untouched: true,
    },
    description: {
      value: '',
      untouched: true,
    },
    imageUrl: {
      value: '',
      untouched: true,
    },
  },
};
/**
 * ACTION CREATORS
 */

export const fieldEditAddProductName = function fieldEditAddProductName(prodNameField) {
  return {
    type: FIELD_EDIT_ADDPRODUCT_NAME,
    value: prodNameField,
  };
};

export const fieldEditAddProductPrice = function fieldEditAddProductPrice(prodPriceField) {
  return {
    type: FIELD_EDIT_ADDPRODUCT_PRICE,
    value: prodPriceField,
  };
};

export const fieldEditAddProductDesc = function fieldEditAddProductDesc(prodDescField) {
  return {
    type: FIELD_EDIT_ADDPRODUCT_DESC,
    value: prodDescField,
  };
};

export const fieldEditAddProductImage = function fieldEditAddProductImage(prodImageField) {
  return {
    type: FIELD_EDIT_ADDPRODUCT_IMAGEURL,
    value: prodImageField,
  };
};
/**
 * REDUCER
 */

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FIELD_EDIT_ADDPRODUCT_NAME:
      return Object.assign({}, state, {
        addProduct: Object.assign({}, state.addProduct, {
          name: {
            value: action.value,
            untouched: false,
          },
        }),
      });

    case FIELD_EDIT_ADDPRODUCT_PRICE:
      return Object.assign({}, state, {
        addProduct: Object.assign({}, state.addProduct, {
          price: {
            value: action.value,
            untouched: false,
          },
        }),
      });

    case FIELD_EDIT_ADDPRODUCT_DESC:
      return Object.assign({}, state, {
        addProduct: Object.assign({}, state.addProduct, {
          description: {
            value: action.value,
            untouched: false,
          },
        }),
      });

    case FIELD_EDIT_ADDPRODUCT_IMAGEURL:
      return Object.assign({}, state, {
        addProduct: Object.assign({}, state.addProduct, {
          imageUrl: {
            value: action.value,
            untouched: false,
          },
        }),
      });

    default:
      return state;
  }
};

export default reducer;
