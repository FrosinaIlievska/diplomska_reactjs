import React, { Component } from 'react';
import './App.css';
import Tomorrowland from './2009.jpg';
import Footer from './Footer';
import Grid from './Grid';


class HomePage extends Component {

    render() {
      let json = require('../src/data/concerts-data.json');
      console.log('json', json);
      json.forEach(e => console.log(e.title));
      return (
        <div>
            <div className="main-page">
            <a><img src={Tomorrowland} className="home-photo" alt="tomorrowland" /></a>
  <div className="middle">
    <h2 className="text">НАСКОРО <h1 style={{color: "black", fontWeight: "bold"}} className="middle2">TOMORROWLAND 2019!</h1></h2>
  </div>
</div>
            <Grid />
            <Footer />
        </div>
        
      );
    }
  }
  
  export default HomePage;