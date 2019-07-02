import React from "react";

import { Link } from "gatsby";

import githubIcon from "../images/header_github_icon.svg";
import twitterIcon from "../images/header_twitter_icon.svg";
import slackIcon from "../images/header_slack_icon.svg";

import appsodyLogo from "../images/appsody_logo.svg";

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';


const NavBar = () => (
  <Navbar className="fixed-top" id="main-nav" expand="lg">
    <Navbar.Brand>
      <Link className="navbar-brand" to="/">
        <img src={ appsodyLogo } width="30" height="30" className="d-inline-block align-top mr-4" alt="Appsody Logo"></img>
      </Link>
      <Link className="navbar-brand d-md-none" to="/">
          Appsody
      </Link>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="navbar-nav">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/docs">Docs</Nav.Link>
      </Nav>
      <Nav className="navbar-nav ml-auto">
        <Nav.Link className="navbar-nav" href="https://github.com/appsody"><img className="navbar-img" src={ githubIcon } alt=""></img></Nav.Link>
        <Nav.Link className="navbar-nav" href="https://twitter.com/appsodydev"><img id="twitter-nav" className="navbar-img" src={ twitterIcon } alt=""></img></Nav.Link>
        <Nav.Link className="navbar-nav" href="http://appsody-slack.eu-gb.mybluemix.net"><img className="navbar-img" src={ slackIcon } alt=""></img></Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default NavBar;
