import React from 'react';
import { PropTypes } from 'prop-types';
import MainLogo from './download copy.png';
import SearchBar from './SearchBar';
import { Link } from 'react-router';
import { connect } from 'react-redux';

require("./Cart.css");


// Header
const Header = ({ children, cartItems, cartButton, homeButton, concertButton, contactButton }) => {

  const getCartButton = () => (
    <div style={{paddingBottom: "-20px"}}>
    <Link to='/cart' className='cart-button'>
      Корпа ({cartItems})
    </Link>
    </div>
  );

  const getHomeButton = () => (
    <Link to='/' className="menu-item1">
      Почетна
    </Link>
  );

  const getConcertButton = () => (
    <Link to='/concerts' className="menu-item2">
      Концерти
    </Link>
  );
  const getContactButton = () => (
    <Link to='/contact' className="menu-item3">
      Контакт
    </Link>
  );

  return (
    <div>
    <div className='shopping-cart-app'>
      <header className='header'>
      <img src={MainLogo} className="App-logo" alt="logo" />
        <div className='header-contents'>
          {homeButton ? getHomeButton() : ''}
          {concertButton ? getConcertButton() : ''}
          {contactButton ? getContactButton() : ''}
        </div>
        {cartButton ? getCartButton() : ''}
        <SearchBar />
      </header>
      <main className='main'>
        {children}
      </main>
    </div>
    </div>
  );
};

Header.PropTypes = {
  cartItems: PropTypes.number.isRequired,
  cartButton: PropTypes.bool.isRequired,
  homeButton: PropTypes.bool.isRequired,
  concertButton: PropTypes.bool.isRequired,
  contactButton: PropTypes.bool.isRequired,
};


// HeaderContainer

const showCartButton = (pathname) => (
  !pathname.includes('cart') ? true : false
);

const showHomeButton = (pathname) => (
  !pathname.includes('homepage') ? true : false
);

const showConcertButton = (pathname) => (
  !pathname.includes('concerts') ? true : false
);

const showContactButton = (pathname) => (
  !pathname.includes('contact') ? true : false
);

const HeaderContainer = connect(
  (state, ownProps) => (
    {
      children: ownProps.children,
      cartItems: state.cart.length,
    cartButton: showCartButton(ownProps.location.pathname),
    homeButton: showHomeButton(ownProps.location.pathname),
    concertButton: showConcertButton(ownProps.location.pathname),
    contactButton: showContactButton(ownProps.location.pathname),
    }
  )
)(Header);

export default HeaderContainer;