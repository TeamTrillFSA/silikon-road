/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export { default as Navbar } from './navbar';
export { default as UserHome } from './user-home';
export { default as Home } from './home';
export { Login, Signup } from './auth-form';
export { default as ProductList } from './product-list';
export { default as Product } from './product';
export { default as AddProduct } from './product-add';
export { default as Checkout } from './checkout';
export { default as Cart } from './cart';
