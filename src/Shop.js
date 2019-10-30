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
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import HeaderContainer from './Header';

require("./Cart.css");

  let json = require('../src/data/concerts-data.json');
  console.log('json', json);
  json.forEach(e => console.log(e.title));

// ShopItem
const ShopItem = ({ id, title, place, price, image, date }) => (
    <li className={'shop-item shop-item-' + title}>
      <Link to={'/item/' + id}>
        <div className='shop-item-container'>
          <img
            className='shop-item-image'
            src={require(`${image}`)}
          />
          <h1 className='shop-item-name'>
            {title}
          </h1>
          <h2 className='shop-item-place'>
            {place}
          </h2>
          <h2 className='shop-item-date'>
            {date}
          </h2>
           <h2 className='shop-item-price'>
            од {price.price1} денари
          </h2>
        </div>
      </Link>
    </li>
  );
  
  ShopItem.PropTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.shape({
      price1: PropTypes.number.isRequired,
    }),
    date: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    place: PropTypes.string.isRequired,
  };
  
  
  // ShopItems
  const ShopItems = ({ items }) => {
    if (!items.length) {
      return <p className='no-shop-items'>Нема концерти</p>;
    }
  
    return (
      <div className='shop-item-list'>
        {items.map(item =>
          <ShopItem
            key={item.id}
            id={item.id}
            title={item.title}
            place={item.place}
            price={item.price}
            image={item.image}
            date={item.date}
          />
        )}
        <Footer />
      </div>
    );
  };
  
  ShopItems.PropTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      place: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      price: PropTypes.shape({
        price0: PropTypes.number.isRequired,
        price1: PropTypes.number.isRequired,
        price2: PropTypes.number.isRequired,
        price3: PropTypes.number.isRequired,
      }),
      count: PropTypes.number.isRequired,
    }).isRequired).isRequired,
  };
  
  
  // ShopItemsContainer
  const ShopItemsContainer = connect(
    (state) => (
      {
        items: state.stock,
      }
    )
  )(ShopItems);
  
  
  // Shop
  const Shop = () => (
    <div className='shop'>
      <h1 className='main-header shop-header'>Концерти</h1>
      <ShopItemsContainer />
    </div>
  );

  export default Shop;