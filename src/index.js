// INITIAL STATE
// --------------------
// --> initialState
// 
// FUNCTIONS
// --------------------
// --> getOptionsArray
// 
// ACTIONS
// --------------------
// --> addToCart
// --> removeFromCart
// --> updateCartItem
// --> removeStockItem
// 
// REDUCERS
// --------------------
// ------> cartItem
// ----> cart
// ------> stockItem
// ----> stock
// --> reducers
// 
// COMPONENTS
// --------------------
// ------> Header
// ----> HeaderContainer
// ----------> ShopItem
// --------> ShopItems
// ------> ShopItemsContainer
// ----> Shop
// ----------> AddItem
// --------> AddItemContainer
// ------> Item
// ----> ItemContainer
// ----------> CartItem
// --------> CartItems
// --------> Total
// --------> PayButton
// ------> Cart
// ----> CartContainer
// ----> NoMatch
// --> App

import React from 'react';
import { PropTypes } from 'prop-types';
import ReactDOM from 'react-dom';

import HomePage from './HomePage';
import { Router, Route, Link, IndexRoute, hashHistory } from 'react-router';
import { createStore, combineReducers } from 'redux';
import { connect, Provider } from 'react-redux';
//import * as initialState from '../src/data/concerts-data.json';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import HeaderContainer from './Header';
import Shop from './Shop';
import ItemContainer from './AddItem';
import CartContainer from './CartItem';
import * as reducers from './reducers';
import * as initialState from './data/initialState';
import ContactView from './Contact';

require("./Cart.css");

// INITIAL STATE

// FUNCTIONS
// getOptionsArray
//getPriceArray

// ACTIONS

// REDUCERS

// COMPONENTS
// Header
// ShopItem
// AddItem
// CartItem
// Total
// PayButton
// Cart


// NoMatch
const NoMatch = () => (
  <p className='no-match'>
    Страницата која ја посетивте не постои.
    Вратете се назад и погледнете ги претсојните концерти.
  </p>
);


// App
const App = () => (
  <MuiThemeProvider>
  <Router history={hashHistory}>
    <Route path='/' component={HeaderContainer}>
    <IndexRoute component={HomePage} />
      <Route path='concerts' component={Shop} />
      <Route path='item/:id' component={ItemContainer} />
      <Route path='cart' component={CartContainer} />
      <Route path='contact' component={ContactView} />
      <Route path='*' component={NoMatch} />
    </Route>
  </Router>
  </MuiThemeProvider>
);

const store = createStore(reducers.reducers, initialState.initialState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);