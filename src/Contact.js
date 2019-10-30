import HomePage from './HomePage';
import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import BottomNavigation from 'material-ui/BottomNavigation';
import BottomNavigationItem from 'material-ui/BottomNavigation';
import MainLogo from './download copy.png';
import './App.css';
import { Router, Route, Link, IndexRoute, hashHistory } from 'react-router';
import Footer from './Footer';

/*
 * Components
 */

class ContactView extends Component {

    render(){ 
    return (
        <div>
        <div style={{textAlign: "center"}}>
        <h2 style={{marginTop: "20px"}}> Оваа веб апликација е дипломски труд изработен од </h2>
        <br/>
                     <h2 style={{color: "darkred", paddingBottom: "24%"}}> Фросина Илиевска 141038 </h2>
        <p> Доколку имате некаков проблем или прашање, ве молам контактирајте ме на: </p>
        <div style={{fontWeight: "bold", paddingBottom: "5px", fontSize: "20px", color: "blue"}}>ilievska.frosina@students.finki.ukim.mk</div>
        <div style={{fontStyle: "italic", fontWeight: "bold", fontSize: "17px", color: "darkgreen"}}> 075/654-431</div>
        </div>
        <Footer />
        </div>
    )
    }};

  
  export default ContactView;