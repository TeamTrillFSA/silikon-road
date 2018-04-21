/* eslint-disable arrow-body-style */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Login, Signup, Home, UserHome, ProductList, Product } from './components';
import { me, fetchAllProducts } from './store';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/products" component={ProductList} />
        <Route path="/products/:id" component={Product} />
        {
          isLoggedIn &&
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route path="/home" component={UserHome} />
            </Switch>
        }
        {/* Displays our home component as a fallback */}
        <Route component={Home} />
      </Switch>
    );
  }
}

/**
 * CONTAINER
 */
// Being 'logged in' for our purposes will be defined
// as having a state.user that has a truthy id.
// Otherwise, state.user will be an empty object, and
// state.user.id will be falsey
const mapState = (state) => ({ isLoggedIn: !!state.user.id });

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
      dispatch(fetchAllProducts());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
