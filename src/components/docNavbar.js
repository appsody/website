import React from "react";

import NavbarContent from './navbarContent';
import Navbar from 'react-bootstrap/Navbar';

const DocNavBar = () => (
  <Navbar className="fixed-top px-md-5" id="main-nav">
    <NavbarContent/>
  </Navbar>
)

export default DocNavBar;
