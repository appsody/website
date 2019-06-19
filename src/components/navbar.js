import React from "react";

import githubIcon from "../../static/images/header_github_icon.svg";
import twitterIcon from "../../static/images/header_twitter_icon.svg";
import slackIcon from "../../static/images/header_slack_icon.svg";

const NavBar = () => (
    <nav className="navbar navbar-expand-md navbar-light bg-primary">
        <a className="navbar-brand d-md-none" href="/">
            Appsody
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsingNavbar">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse collapse" id="collapsingNavbar">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" href="/">Home</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/docs">Docs</a>
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

export default NavBar;
