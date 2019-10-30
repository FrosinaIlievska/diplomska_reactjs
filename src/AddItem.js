import React, {Component} from 'react';
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

require("./Cart.css");

const getOptionsArray = (count) => {
    const array = [];
    for (let i = 0; i < count; i++) {
      array.push(i + 1);
    }
    return array;
  };
  
  const getPriceArray = (price) => {
    const array = [];
    let key=0;
  for(key in price) {
    if(price.hasOwnProperty(key)) {
        array.push(price[key]);
    }
  }
  return array;
  };




const AddItem = ({ id, count, onSubmit }) => {
    if (!count) {
      return (
        <p className='item-sold-out'>
          Распродадено!
        </p>
      );
    }
  
    return (
      <form
        className='item-add-form'
        onSubmit={e => {
          e.preventDefault();
          onSubmit(e, id);
        }}
      >
        <span className='item-qty-label'>
          Број на карти:
        </span>
        <select className='item-qty'>
          {getOptionsArray(count).map(num =>
            <option
              key={num}
              value={num}
            >
              {num}
            </option>
          )}
        </select>
        <button
          className='item-add-button'
          type='submit'
        >
          Додај во корпата
        </button>
      </form>
    );
  };
  
  AddItem.PropTypes = {
    count: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
  };
  
  
  // AddItemContainer
  const addItemGetSelectedValue = (e) => (
    e.target.getElementsByClassName('item-qty')[0].value
  );

  const addItemGetSelectedPrice = (e) => (
      e.target.getElementsByClassName('item-cart-price')[0].value
  )
  
  const AddItemContainer = connect(
    (state, ownProps) => (
      {
        id: ownProps.id,
        priceSelected: ownProps.priceSelected,
        count: state.stock.find(item => item.id === ownProps.id).count,
        inCart: state.cart.some(item => item.id === ownProps.id),
      }
    ),
    null,
    (stateProps, dispatchProps, ownProps) => {
      const onSubmit = stateProps.inCart ? action.updateCartItem : action.addToCart;
      return Object.assign({}, ownProps, stateProps, dispatchProps, {
        onSubmit: (e, id) => {
          dispatchProps.dispatch(onSubmit(id, addItemGetSelectedValue(e), ownProps.priceSelected));
        },
      });
    }
  )(AddItem);
  
  
  // Item

  class Item extends Component {
      constructor(props) {
          super(props);
          this.state = {priceSelected: ""};
          this.onPriceChange = this.onPriceChange.bind(this);
      }

      onPriceChange(e){
        console.log('priceSelected', e.target.value);
        this.setState({priceSelected: e.target.value});
    }

      render(){ 
       const { id, title, description, count, image, price } = this.props;
        return (<div className={'item item-' + id}>
        <img
          className='item-image'
          src={require(`${image}`)}
        />
        <div className='item-details'>
          <h1 className='item-name'>
            {title}
          </h1>
          <span className='item-qty-label'>
            Цена:
          </span>
          <select className='item-cart-price'  value={this.state.priceSelected}
          onChange={this.onPriceChange}>
            {getPriceArray(price).map(num =>
              <option
                key={num}
                value={num}
              >
                {num}
              </option>
            )}
          </select>
          <p className='item-desc'>
            {description}
          </p>
          <AddItemContainer id={id} priceSelected={this.state.priceSelected}/>
        </div>
      </div>)
      }
  }


  /* const Item = ({ id, title, description, count, image, price }) => ({

    onPriceChange(e){
        console.log('priceSelected', e.target.value);
        this.setState({priceSelected: e.target.value});
    },

      render(){ 
        return (<div className={'item item-' + id}>
        <img
          className='item-image'
          src={require(`${image}`)}
        />
        <div className='item-details'>
          <h1 className='item-name'>
            {title}
          </h1>
          <span className='item-qty-label'>
            Цена:
          </span>
          <select className='item-cart-price'>
          value={this.state.priceSelected}
          onChange={this.onPriceChange}
            {getPriceArray(price).map(num =>
              <option
                key={num}
                value={num}
              >
                {num}
              </option>
            )}
          </select>
          <p className='item-desc'>
            {description}
          </p>
          <AddItemContainer id={id} />
        </div>
      </div>)
      }
  }
    
  ); */
  
  Item.PropTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.shape({
      price1: PropTypes.number.isRequired,
      price2: PropTypes.number.isRequired,
      price3: PropTypes.number.isRequired,
    }),
    count: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  };
  
  
  // ItemContainer
  const ItemContainer = connect(
    (state, ownProps) => (
      state.stock.find(item => String(item.id) === ownProps.params.id)
    )
  )(Item);

  export default ItemContainer;