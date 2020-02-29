import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Product from './components/Product';
import Default from './components/Default';
import Cart from './components/Cart/Cart';
import Details from './components/Details';

import Modal from './components/Modal';

  class App extends Component{
   render(){
     return (
      //  <div className="App">
      //  <h1>testapp1</h1>
      //  </div>
         <React.Fragment>
      
      <Navbar />
      
        <div>
                 
          <Route exact path="/" component={ProductList}/>
          <Route  path="/details" component={Details}/> 
          <Route  path="/cart" component={Cart}/>
            <Route component={Default}/> 
        </div>
      <Modal/>
          
         </React.Fragment> 
       
      );
   }
   }

export default App;
