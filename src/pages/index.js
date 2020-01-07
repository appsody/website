import React from "react";

import Layout from "../components/layout"

import TopDownloadedTileGrid from "../components/topDownloadedTileGrid";
import RecentlyUpdatedTileGrid from "../components/recentlyUpdatedTileGrid";

import kubeLogo from "../images/kubernetes_logo.png";
import promLogo from "../images/prometheus_logo.png";
import tektonLogo from "../images/tekton_logo.png";

import appsodyFullLogoWhite from "../images/appsody_full_logo_white.svg";
import appsodyFullLogo from "../images/appsody_full_logo.svg";
import appsodyHello from "../images/appsody_hello.svg";

import { Link } from "gatsby";

const IndexPage = () => (
  <Layout>
  <div className="container">
    <section className="landing-section">
      <div className="row w-100 mx-auto">
        <div className="col">

          <img className="w-75 my-4 full-logo-homepage-white white-appsody-full" src={ appsodyFullLogoWhite } alt="Appsody Logo"></img>
          <img className="w-75 my-4 full-logo-homepage-black black-appsody-full" src={ appsodyFullLogo } alt="Appsody Logo"></img>
          <p className="lead">
            Compose a cloud native masterpiece.
          </p>
          <p className="hero-description">
            Infused with cloud native capabilities from the moment you start, Appsody provides everything you need to iteratively develop applications, ready for deployment to Kubernetes environments. Teams are empowered with sharable technology stacks, configurable and controllable through a central hub.
          </p>
          <div className="d-flex">
            <Link to="/docs/getting-started/quick-start" className="btn btn-primary mr-2 w-50" role="button">Get Started</Link>
            <Link to="/docs" className="btn btn-clear w-50" role="button">Overview</Link>
          </div>
        </div>
        <div className="col d-none d-md-inline text-center">
          <img id="appsody-hello" className="mt-3" src={ appsodyHello } alt="Appsody Logo"></img>
        </div>
      </div>
    </section>
    <section className="landing-section text-center">
      <h2 className="mb-2">Why Appsody?</h2>
      <div className="container">
        <div className="row w-100 mx-auto">
          <div className="col m-3 p-4">
            <h3>CLI</h3>
            <p>Intuitive and powerful. The Appsody CLI allows you to connect to a Hub, pull down a stack, and create, build, test and deploy your application.</p>
          </div>
          <div className="col m-3 p-4">
            <h3>Stacks</h3>
            <p>Create, modify and share technology stacks with inbuilt cloud native capabilities, such as health checks, monitoring and OpenAPI descriptions.</p>
          </div>
          <div className="col m-3 p-4">
            <h3>Hub</h3>
            <p>A central repository of available stacks, enabling a single point of control for applications built from these foundations.</p>
          </div>
        </div>
      </div>
    </section>
    <section className="landing-section featured-stacks">
      <div id="application-stack">
        <h2>Featured Application Stacks</h2>
        <div className="btn-group" role="group" >
          <button id="downloads-button" onClick={() => switchDownloaded()}  className="btn btn-primary stepper-left">Most Popular</button>
          <button id="recently-button" onClick={() => switchRecent()}  className="btn btn-clear stepper-right">Recently Updated</button>
        </div>
        <p>Select the application stack to view further details on GitHub or copy the command to start using the stack with our CLI.</p>
      </div>
      <div id="top-downloads" className="top-downloaded-tile-grid">
        <TopDownloadedTileGrid/>
      </div>
      <div id="recently-updated" className="recently-updated-tile-grid">
        <RecentlyUpdatedTileGrid/>
      </div>
      <div className="text-center t-50">
      <p id="application-stack-info">Visit our dedicated Stacks page to see all of the Stacks available.</p>
        <Link to="/stacks" className="btn btn-primary mx-auto all-stacks-button" role="button">View All Stacks</Link>
      </div>
    </section>
    <section className="landing-section text-center bottom-spacer">
      <h2 >Built on open source</h2>
      <div className="d-flex flex-wrap justify-content-center mb-5">
        <img className="m-3" src={ kubeLogo } alt="Kubernetes Logo"></img>
        <img className="m-3" src={ promLogo } alt="Prometheus Logo"></img>
        <img className="m-3" src={ tektonLogo } alt="Tekton Logo"></img>
      </div>
    </section>
  </div>
  </Layout>
)

export default IndexPage

function switchDownloaded() {

  document.getElementById('recently-updated').style.cssText = 'display: none';
  document.getElementById('top-downloads').style.cssText = 'display: block';

  document.getElementById('downloads-button').style.cssText = 'background: #BB417C; color: white'
  document.getElementById('downloads-button').className = 'btn btn-primary stepper-left'

  document.getElementById('recently-button').style.cssText = 'background: clear; color: black @media (prefers-color-scheme: dark) { color: white; }'
  document.getElementById('recently-button').className = 'btn btn-clear stepper-right'

}

function switchRecent() {
  
  document.getElementById('top-downloads').style.cssText = 'display: none';
  document.getElementById('recently-updated').style.cssText = 'display: block';

  document.getElementById('downloads-button').style.cssText = 'background: clear; color: black @media (prefers-color-scheme: dark) { color: white; }'
  document.getElementById('downloads-button').className = 'btn btn-clear stepper-left'

  document.getElementById('recently-button').style.cssText = 'background: #BB417C; color: white'
  document.getElementById('recently-button').className = 'btn btn-primary stepper-right'

}