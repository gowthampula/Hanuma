import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import logo from "../logo.svg";
import {ButtonContainer} from './Button';
import styled from "styled-components";
//import "bootstrap/dist/css/bootstrap.min.css";

export class Navbar extends Component{
render(){
return(
    
    <NavWrapper className="navbar navbar-expand-sm  navbar-dark px-sm-5">
        <Link to="/" className="nav-link"> 
             <img src={logo} alt="store" className="navbar-brand"/> 
        </Link>   
        <ul className="navbar-nav align-items-center">
            <li className="nav-item ml-5">
            <Link to="/" className="nav-link"> 
                Products
            </Link>
            </li>
        </ul>
        <Link to="/cart" className="ml-auto"> 
               <ButtonContainer>
                   <span className="mr-2">
               <i class="fas fa-cart-plus"></i>
                   My cart
                   </span>
                   </ButtonContainer>
            </Link>
   </NavWrapper>

);
}
}
const NavWrapper = styled.nav
`
background:var(--mainblue);
.nav-link{
    color:var(--mainWhite)!important;
    font-size:1.3rem;
    text-transform:capitalize !important;   
}
`
export default Navbar
