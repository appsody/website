import React from "react";

import Layout from "../layouts"

import TileGrid from "../components/tileGrid";

import kubeLogo from "../images/kubernetes_logo.png";
import promLogo from "../images/prometheus_logo.png";
import tektonLogo from "../images/tekton_logo.png";

import appsodyFullLogo from "../images/appsody_full_logo.svg";
import appsodyHello from "../images/appsody_hello.svg";

import { Link } from "gatsby";

const IndexPage = () => (
  <Layout>
  <div className="container">
    <section className="landing-section">
      <div className="row w-100 mx-auto">
        <div className="col">
          <img className="w-75 my-4" src={ appsodyFullLogo } alt="Appsody Logo"></img>
          <p className="lead">
            Compose a cloud native masterpiece.
          </p>
          <p>
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
    <section className="landing-section">
      <div id="application-stack">
        <h2>Application Stacks</h2>
        <p id="application-stack-info">Select the application stack to view further details on GitHub or copy the command to start using the stack with our CLI.</p>
      </div>
      <TileGrid/>
    </section>
    <section className="landing-section text-center">
      <h2 >Built on open source</h2>
      <div className="d-flex flex-wrap justify-content-center">
        <img className="m-3" src={ kubeLogo } alt="Kubernetes Logo"></img>
        <img className="m-3" src={ promLogo } alt="Prometheus Logo"></img>
        <img className="m-3" src={ tektonLogo } alt="Tekton Logo"></img>
      </div>
    </section>
    <section className="landing-section text-center">
      <h2 className="mb-2">Why Appsody?</h2>
      <div className="container">
        <div className="row w-100 mx-auto homepage-sections">
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
  </div>
  </Layout>
)

export default IndexPage
