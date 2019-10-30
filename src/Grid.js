import React, { Component } from 'react';
//import ReactDOM from "react-dom";
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import tileData from '../src/data/tileData';
import tileData2 from '../src/data/tileData';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import 'bootstrap/dist/css/bootstrap.min.css';
import FlatButton from 'material-ui/FlatButton';
import { Router, Route, Link, IndexRoute, hashHistory } from 'react-router';


const styles = theme => ({
    root: {
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: "rgb(231, 239, 231)",
      paddingLeft: "5%",
      paddingTop: "2%",
      marginBottom: "2%",
      border: "0.0625rem solid #555",
      boxShadow: "0 0 0.625rem 0.25rem #555",
    },

    root2: {
        flexWrap: 'wrap',
        flex: 'right',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: "rgb(231, 239, 231)",
        paddingLeft: "52%",
        marginTop: "-33.9%",
        paddingBottom: "2%",
      },    

    gridList: {
      width: 600,
      height: 450,
    },
    subheader: {
      width: '100%',
    },
  });

  function ImageGridList(props) {
    const { classes } = props;
  
    return (
        <div style={{backgroundColor: "rgb(231, 239, 231)", border: "0.0625rem solid #555",
        boxShadow: "0 0 0.625rem 0.25rem #555",}}>
        <h1 style={{textAlign: "center", padding: "20px"}}> НОВИ КОНЦЕРТИ </h1>
      <div className={classes.root}>
        <GridList cellHeight={220} className={classes.gridList} cols={4}>
          {tileData.tileData1.map(tile => (
            <GridListTile key={tile.img} cols={tile.cols || 1}>
              <img className="grid-photo" src={tile.img} alt={tile.title} />
            </GridListTile>
          ))}
        </GridList>
        </div>
      <div className={classes.root2}>
        <GridList cellHeight={220} className={classes.gridList} cols={4}>
          {tileData.tileData2.map(tile => (
            <GridListTile key={tile.img} cols={tile.cols || 1}>
              <img className="grid-photo" src={tile.img} alt={tile.title} />
        </GridListTile>
          ))}
        </GridList>
      </div>
      <div style={{backgroundColor: "rgb(231, 239, 231)",}}>
      <Link to="/concerts"><FlatButton style={{marginBottom: "1%", border: "0.0625rem solid #555",
  boxShadow: "0 0 0.625rem 0.25rem #555"}} fullWidth backgroundColor={"IndianRed"} hoverColor={"red"}>КУПИ БИЛЕТ ЗА ТВОЈОТ ОМИЛЕН КОНЦЕРТ!</FlatButton></Link>
      </div>
      </div>
    );
  }
  
  ImageGridList.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(ImageGridList);