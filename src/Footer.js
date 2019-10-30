import HomePage from './HomePage';
import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import BottomNavigation from 'material-ui/BottomNavigation';
import BottomNavigationItem from 'material-ui/BottomNavigation';
import MainLogo from './download copy.png';
import './App.css';
import { Router, Route, Link, IndexRoute, hashHistory } from 'react-router';

const styles = {
    root: {
      width: 500,
    },
  };

class Footer extends Component {  

    state = {
        value: 0,
      };
    
      handleChange = (event, value) => {
        this.setState({ value });
      };
  
    render() {
        const { value } = this.state;
      return (
            <div className="container-footer">
            <Link to="/"><FlatButton fullWidth> Почетна </FlatButton> </Link>
            <Link to="/concerts"><FlatButton fullWidth> Концерти </FlatButton> </Link>
            <Link to="/contact"><FlatButton fullWidth> Контакт </FlatButton> </Link>
            <img src={MainLogo} className="footer-logo" alt="logo" />
            </div>
      );
    }
  }
  
  export default Footer;