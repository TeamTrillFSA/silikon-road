import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './user';
import userInput from './userInput';
import products from './products';
import order_product from './order_product';
import order from './order';
import address from './address';

const reducer = combineReducers({ user, products, order_product, order, userInput, address });
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true }),
));
const store = createStore(reducer, middleware);

export default store;
export * from './user';
export * from './userInput';
export * from './products';
export * from './order_product';
export * from './order';
export * from './address';
