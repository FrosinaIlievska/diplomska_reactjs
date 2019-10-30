import React from 'react';
import { PropTypes } from 'prop-types';

require("./Cart.css");

  const PayButton = ({ onPayClick }) => (
    <button
      type='button'
      className='cart-pay-button'
      onClick={() => onPayClick()}
    >
      Плати
    </button>
  );
  
  PayButton.PropTypes = {
    onPayClick: PropTypes.func.isRequired,
  };

  export default PayButton;