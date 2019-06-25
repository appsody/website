import React from "react";
import Tile from "../components/tile";

import kubeLogo from "../images/kubernetes_logo.png";
import promLogo from "../images/prometheus_logo.png";
import tektonLogo from "../images/tekton_logo.png";

import appsodyFullLogo from "../images/appsody_full_logo.svg";

import { Link } from "gatsby";

const IndexPage = () => (
  <div className="container">
    <section className="landing-section">
      <div className="row w-100 mx-auto">
        <div className="col">
          <img className="w-75 my-4" src={ appsodyFullLogo } alt="Appsody Logo"></img>
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
        <div className="col d-none d-md-inline">

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
          <Tile id="java-MicroProfile" heading="Java MicroProfile" desc="Microprofile using Adopt OpenJDK and Maven" cmd="appsody init java-microprofile" github="https://github.com/appsody/stacks/tree/master/incubator/java-microprofile"/>
          <Tile id="java-spring" heading="Java Spring" desc="Spring Boot using IBM Java SDK and Maven" cmd="appsody init java-spring-boot2" github="https://github.com/appsody/stacks/tree/master/incubator/java-spring-boot2"/>
          <Tile id="node" heading="Node.js" desc="Node.js runtime" cmd="appsody init nodejs" github="https://github.com/appsody/stacks/tree/master/incubator/nodejs"/>
          <Tile id="node-express" heading="Node.js Express" desc="Express web framework for Node.js" cmd="appsody init nodejs-express" github="https://github.com/appsody/stacks/tree/master/incubator/nodejs-express"/>
        </div>
      </div>
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
      <div className="row w-100 mx-auto">
        <div className="col m-3 p-4">
          <h3>CLI</h3>
          <p>Qui et ad mollit nulla ea qui. Enim culpa labore excepteur sunt nostrud. Commodo culpa et non officia cillum irure pariatur ea qui tempor id non. Fugiat cupidatat reprehenderit labore irure tempor aliqua commodo aliquip esse sint voluptate. Quis et officia officia ut incididunt excepteur aute exercitation deserunt voluptate fugiat pariatur sunt. Esse minim ullamco occaecat reprehenderit esse laboris.</p>
        </div>
        <div className="col m-3 p-4">
          <h3>Stacks</h3>
          <p>Qui et ad mollit nulla ea qui. Enim culpa labore excepteur sunt nostrud. Commodo culpa et non officia cillum irure pariatur ea qui tempor id non. Fugiat cupidatat reprehenderit labore irure tempor aliqua commodo aliquip esse sint voluptate. Quis et officia officia ut incididunt excepteur aute exercitation deserunt voluptate fugiat pariatur sunt. Esse minim ullamco occaecat reprehenderit esse laboris.</p>
        </div>
        <div className="col m-3 p-4">
          <h3>Hub</h3>
          <p>Qui et ad mollit nulla ea qui. Enim culpa labore excepteur sunt nostrud. Commodo culpa et non officia cillum irure pariatur ea qui tempor id non. Fugiat cupidatat reprehenderit labore irure tempor aliqua commodo aliquip esse sint voluptate. Quis et officia officia ut incididunt excepteur aute exercitation deserunt voluptate fugiat pariatur sunt. Esse minim ullamco occaecat reprehenderit esse laboris.</p>
        </div>
      </div>
    </section>
  </div>
)

export default IndexPage
