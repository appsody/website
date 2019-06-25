import React from "react";

import { Link } from "gatsby";

import githubIcon from "../images/header_github_icon.svg";
import twitterIcon from "../images/header_twitter_icon.svg";
import slackIcon from "../images/header_slack_icon.svg";

import appsodyLogo from "../images/appsody_logo.svg";

const DocNavBar = () => (

    <nav id="main-nav" className="navbar navbar-expand navbar-light fixed-top">
        <Link className="navbar-brand" to="/">
            <img src={ appsodyLogo } width="30" height="30" className="d-inline-block align-top mr-md-4" alt="Appsody Logo"></img>
        </Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsingNavbar">
          <span className="navbar-toggler-icon"></span>
      </button>
      <div className="navbar-collapse collapse" id="collapsingNavbar">
          <ul className="navbar-nav">
              <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                  <Link className="nav-link" to="/docs">Docs</Link>
              </li>
          </ul>
          <ul className="navbar-nav ml-auto">
              <li>
                  <a className="nav-link" href="https://github.com/appsody">
                      <img className="navbar-img" src={ githubIcon } alt=""></img>
                  </a>
              </li>
              <li className="nav-item">
                  <a className="nav-link" href="https://twitter.com/appsodydev">
                      <img className="navbar-img" src={ twitterIcon } alt=""></img>
                  </a>
              </li>
              <li>
                  <a className="nav-link" href="/">
                      <img className="navbar-img" src={ slackIcon } alt=""></img>
                  </a>
              </li>
          </ul>
      </div>
  </nav>
)

export default DocNavBar;
