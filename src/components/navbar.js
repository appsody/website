import React from "react";

import NavbarContent from './navbarContent';
import Navbar from 'react-bootstrap/Navbar';

const NavBar = () => (
  <Navbar className="fixed-top px-md-5" id="main-nav" expand="md">
    <NavbarContent/>
  </Navbar>
)

export default NavBar;
