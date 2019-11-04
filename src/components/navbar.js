import React from "react";

import Navbar from 'react-bootstrap/Navbar';
import { Link } from "gatsby";

import githubIcon from "../images/header_github_icon.svg";
import twitterIcon from "../images/header_twitter_icon.svg";
import slackIcon from "../images/header_slack_icon.svg";

import appsodyLogo from "../images/appsody_logo.svg";

import Nav from 'react-bootstrap/Nav';
import Search from './search';

const NavBar = () => (
  <Navbar className="fixed-top px-md-5" id="main-nav" expand="md">
    <Navbar.Brand>
      <Link to="/">
        <img src={ appsodyLogo } width="30" height="30" className="d-inline-block align-top mr-4" alt="Appsody Logo"></img>
      </Link>
    </Navbar.Brand>
    <Nav className="ml-auto smallscreen-social">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Nav.Link href="https://github.com/appsody"><img className="navbar-img" src={ githubIcon } alt=""></img></Nav.Link>
        <Nav.Link href="https://twitter.com/appsodydev"><img id="twitter-nav" className="navbar-img" src={ twitterIcon } alt=""></img></Nav.Link>
        <Nav.Link href="http://appsody-slack.eu-gb.mybluemix.net"><img className="navbar-img" src={ slackIcon } alt=""></img></Nav.Link>
    </Nav>
        <Navbar.Collapse id="basic-navbar-nav">
      <Nav>
        <Nav.Link href="/" className="d-none d-md-block">Home</Nav.Link>
        <Nav.Link href="/docs" className="d-none d-md-block">Docs</Nav.Link>
        <Nav.Link href="https://medium.com/appsody" target="_blank" rel="noopener noreferrer" className="d-none d-md-block">Tutorials</Nav.Link>
      </Nav>
      <Nav className="ml-auto">
        <Search/>
      </Nav>
    </Navbar.Collapse>
            <Nav className="ml-auto bigscreen-social">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Nav.Link href="https://github.com/appsody"><img className="navbar-img" src={ githubIcon } alt=""></img></Nav.Link>
        <Nav.Link href="https://twitter.com/appsodydev"><img id="twitter-nav" className="navbar-img" src={ twitterIcon } alt=""></img></Nav.Link>
        <Nav.Link href="http://appsody-slack.eu-gb.mybluemix.net"><img className="navbar-img" src={ slackIcon } alt=""></img></Nav.Link>
    </Nav>
  </Navbar>
)

export default NavBar;
