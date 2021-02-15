import React from "react";

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from "gatsby";

import githubIcon from "../images/header_github_icon.svg";
import appsodyLogo from "../images/appsody_logo.svg";

import Search from './search';

const NavBar = () => (
  <header className="fixed-top">
  <div className="px-md-5 banner">
    <p className="banner-text">Development of Appsody as a standalone project has ended, but the core technologies of Appsody have been merged with odo to create odo 2.0!  See our <Link className="banner-blog-link" to="/blogs/DevelopmentEnded">blog post</Link> for more details!</p>
  </div>
    <Navbar className="px-md-5" style={{zIndex: "-10000"}} id="main-nav" expand="md">
      <Navbar.Brand>
        <Link to="/">
          <img src={ appsodyLogo } width="30" height="30" className="d-inline-block align-top mr-4" alt="Appsody Logo"></img>
        </Link>
      </Navbar.Brand>
      <Nav className="ml-auto smallscreen-social">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Nav.Link href="https://github.com/appsody"><img className="navbar-img" src={ githubIcon } alt=""></img></Nav.Link>
      </Nav>
          <Navbar.Collapse id="basic-navbar-nav">
        <Nav>
          {/* <Nav.Link href="/" className="d-none d-md-block">Home</Nav.Link> */}
          <Nav.Link href="/docs" className="d-none d-md-block">Docs</Nav.Link>
          <Nav.Link href="/stacks" className="d-none d-md-block">Stacks</Nav.Link>
          <Nav.Link href="/blogs" className="d-none d-md-block">Blogs</Nav.Link>
          <Nav.Link href="/tutorials" className="d-none d-md-block">Tutorials</Nav.Link>
        </Nav>
        <Nav className="ml-auto">
          <Search/>
        </Nav>
      </Navbar.Collapse>
              <Nav className="ml-auto bigscreen-social">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Nav.Link href="https://github.com/appsody"><img className="navbar-img" src={ githubIcon } alt=""></img></Nav.Link>
      </Nav>
    </Navbar>
  </header>
)

export default NavBar;
