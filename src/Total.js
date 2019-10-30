import React from 'react';
import { PropTypes } from 'prop-types';

require("./Cart.css");


const Total = ({ cart }) => (
    <div className='cart-total'>
      <span className='cart-total-label'>
        Вкупно:
      </span>
      <span className='cart-total-value'>
        {cart.length ? cart.reduce((acc, item) => (
          acc + item.priceSelected * item.count
        ), 0) : Number(0)} денари
      </span>
    </div>
  );
  
  Total.PropTypes = {
    cart: PropTypes.arrayOf(PropTypes.shape({
      price: PropTypes.shape({
        price1: PropTypes.number.isRequired,
        price2: PropTypes.number.isRequired,
        price3: PropTypes.number.isRequired,
      }),
      priceSelected: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired,
    }).isRequired).isRequired,
  };

  export default Total;