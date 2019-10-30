import React from 'react';
import { PropTypes } from 'prop-types';
import ReactDOM from 'react-dom';

import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './HomePage';
import MainLogo from './download copy.png';
import SearchBar from './SearchBar';
import Footer from './Footer';
import { Router, Route, Link, IndexRoute, hashHistory } from 'react-router';
import { createStore, combineReducers } from 'redux';
import { connect, Provider } from 'react-redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import ConcertData from '../src/data/concerts-data.json';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as action from './actions';
import PayButton from './PayButton';
import Total from './Total';

require("./Cart.css");

const getOptionsArray = (count) => {
    const array = [];
    for (let i = 0; i < count; i++) {
      array.push(i + 1);
    }
    return array;
  };

const CartItem = (
    { id, title, price, image, count, stockCount, onQtyChange, onPriceChange, onRemoveClick, priceSelected }
  ) => (
    <li className={'cart-item cart-item-' + id}>
      <Link
        to={'/item/' + id}
        className='cart-item-image-link'
      >
        <img
          className='cart-item-image'
          src={require(`${image}`)}
        />
      </Link>
      <div className='cart-item-info'>
        <Link
          to={'/item/' + id}
          className='cart-item-name-link'
        >
          <h1 className='cart-item-name'>
            {title}
          </h1>
        </Link>
        <div className='cart-item-value'>
        <span>
            Цена:
            <div
              value={price}
              onChange={(e) => onPriceChange(e, id)}
            >
                <div
                  key={priceSelected}
                  value={priceSelected}
                >
                  {priceSelected}
                </div>
            </div>
          </span>
          <span className='cart-item-qty'>
            Број на карти:
            <select
              className='cart-item-qty-select'
              value={count}
              onChange={(e) => onQtyChange(e, id)}
            >
              {getOptionsArray(stockCount).map(num =>
                <option
                  key={num}
                  value={num}
                >
                  {num}
                </option>
              )}
            </select>
          </span>
        </div>
      </div>
      <a
        href="#"
        className='cart-item-delete'
        onClick={(e) => {
          onRemoveClick(e, id);
        }}
      >
        ×
      </a>
    </li>
  );
  
  CartItem.PropTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.shape({
      price1: PropTypes.number.isRequired,
      price2: PropTypes.number.isRequired,
      price3: PropTypes.number.isRequired,
    }),  image: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    stockCount: PropTypes.number.isRequired,
    priceCount: PropTypes.number.isRequired,
    onPriceChange: PropTypes.func.isRequired,
    onQtyChange: PropTypes.func.isRequired,
    onRemoveClick: PropTypes.func.isRequired,
    priceSelected: PropTypes.number.isRequired
  };
  
  
  // CartItems
  const CartItems = ({ cart, onQtyChange, onRemoveClick, onPriceChange }) => {
    if (!cart.length) {
      return <p className='empty-cart'>Корпата е празна</p>;
    }
  
    return (
      <ul className='cart-items'>
        {cart.map(item =>
          <CartItem
            key={item.id}
            id={item.id}
            title={item.title}
            image={item.image}
            count={item.count}
            stockCount={item.stockCount}
            priceCount={item.priceCount}
            priceSelected={item.priceSelected}
            onQtyChange={(e, id) => onQtyChange(e, id)}
            onPriceChange={(e, id) => onPriceChange(e, id)}
            onRemoveClick={(e, id) => onRemoveClick(e, id)}
          />
        )}
      </ul>
    );
  };
  
  CartItems.PropTypes = {
    cart: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.shape({
        price1: PropTypes.number.isRequired,
        price2: PropTypes.number.isRequired,
        price3: PropTypes.number.isRequired,
      }),
      image: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
      stockCount: PropTypes.number.isRequired,
      priceCount: PropTypes.number.isRequired,
    }).isRequired).isRequired,
    onQtyChange: PropTypes.func.isRequired,
    onPriceChange: PropTypes.func.isRequired,
    onRemoveClick: PropTypes.func.isRequired,
  };


  const Cart = ({ cart, onQtyChange, onPriceChange, onRemoveClick, onPayClick }) => (
    <div className='cart'>
      <h1 className='main-header cart-header'>Мои билети</h1>
      <CartItems
        cart={cart}
        onQtyChange={onQtyChange}
        onRemoveClick={onRemoveClick}
        onPriceChange={onPriceChange}
      />
      <Total cart={cart} />
      <PayButton onPayClick={onPayClick} />
    </div>
  );
  
  Cart.PropTypes = {
    cart: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.shape({
        price1: PropTypes.number.isRequired,
        price2: PropTypes.number.isRequired,
        price3: PropTypes.number.isRequired,
      }),
      image: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
      stockCount: PropTypes.number.isRequired,
      priceCount: PropTypes.number.isRequired,
      priceSelected: PropTypes.number.isRequired
    }).isRequired).isRequired,
    onQtyChange: PropTypes.func.isRequired,
    onPriceChange: PropTypes.func.isRequired,
    onRemoveClick: PropTypes.func.isRequired,
    onPayClick: PropTypes.func.isRequired,
  };
  
  
  // CartContainer
  const cartGetSelectedValue = (e) => (
    e.target.value
  );
  
  const CartContainer = connect(
    (state) => (
      {
        cart: state.cart.map(cartItem => {
          const item = state.stock.find(stockItem => cartItem.id === stockItem.id);
          return {
            id: cartItem.id,
            title: item.title,
            image: item.image,
            count: cartItem.count,
            stockCount: item.count,
            priceCount: item.price,
            priceSelected: cartItem.priceSelected
          };
        }),
      }
    ),
    (dispatch) => (
      {
        onQtyChange: (e, id) => {
          dispatch(action.updateCartItem(id, cartGetSelectedValue(e)));
        },
  
        onPriceChange: (e, id) => {
          dispatch(action.updateCartItem(id, cartGetSelectedValue(e)));
        },
  
        onRemoveClick: (e, id) => {
          e.preventDefault();
          dispatch(action.removeFromCart(id));
        },
  
        dispatch: (reducer) => dispatch(reducer),
      }
    ),
    (stateProps, dispatchProps, ownProps) => (
      Object.assign({}, ownProps, stateProps, dispatchProps, {
        onPayClick: () =>
          stateProps.cart.map(item => {
            dispatchProps.dispatch(action.removeStockItem(item.id, item.count));
            dispatchProps.dispatch(action.removeFromCart(item.id));
          }),
      })
    )
  )(Cart);


  export default CartContainer;