import React from "react";
import Tile from "../components/tile";

import kubeLogo from "../images/kubernetes_logo.png";
import promLogo from "../images/prometheus_logo.png";
import tektonLogo from "../images/tekton_logo.png";

import githubIcon from "../images/header_github_icon.svg";
import twitterIcon from "../images/header_twitter_icon.svg";
import slackIcon from "../images/header_slack_icon.svg";

import { Link } from "gatsby";

const IndexPage = () => (
  <div className="container">
    <section className="landing-section">
      <div className="row w-100 mx-auto">
        <div className="col">
          <h1>Appsody</h1>
          <p className="lead">
            Eagles bowtie dirty durham pride slow-food.
          </p>
          <p>
            Adipisicing eiusmod laborum laboris sunt labore est est ad Lorem est. Magna enim adipisicing veniam ea velit velit aute. Commodo irure anim nisi nulla reprehenderit ipsum. Quis et Lorem officia nulla nostrud Lorem nulla in exercitation deserunt.
          </p>
          <div className="d-flex">
            <Link to="/" className="btn btn-primary mr-2 w-50" role="button">Get Started</Link>
            <Link to="/" className="btn btn-clear w-50" role="button">Why Appsody</Link>
          </div>
        </div>
        <div className="col d-none d-md-inline border border-dark">
          Gif
        </div>
      </div>
    </section>
    <section className="landing-section">
      <div id="application-stack">
        <h2>Application Stacks</h2>
        <p id="application-stack-info">Select the application pack to view details, then copy the command toclone it using your CLI or view the packs in GitHub.</p>
      </div>
      <div className="container">
        <div id="application-stacks" className="row mx-auto">
          <Tile id="java-MicroProfile" heading="Java MicroProfile" image={githubIcon} cmd="appsody init java-microprofile"/>
          <Tile id="java-spring" heading="Java Spring" image={twitterIcon} cmd="appsody init java-spring-boot2"/>
          <Tile id="node" heading="Node.js" image={slackIcon} cmd="appsody init nodejs"/>
          <Tile id="node-express" heading="Node.js Express" image={slackIcon} cmd="appsody init nodejs-express"/>
        </div>
      </div>
    </section>
    <section className="landing-section">
      <div className="d-flex flex-wrap justify-content-center">
        <img className="m-3" src={ kubeLogo } alt="Kubernetes Logo"></img>
        <img className="m-3" src={ promLogo } alt="Prometheus Logo"></img>
        <img className="m-3" src={ tektonLogo } alt="Tekton Logo"></img>
      </div>
    </section>
    <section className="landing-section text-center">
      <h2 className="mb-5">Why Appsody?</h2>
      <div className="d-flex flex-wrap justify-content-center w-100">
        <div className="border my-3 p-4">
          Graph or graphic and information
        </div>
        <div className="border m-3 p-4">
          Graph or graphic and information
        </div>
        <div className="border my-3 p-4">
          Graph or graphic and information
        </div>
      </div>
    </section>
  </div>
)

export default IndexPage
