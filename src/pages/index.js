import React from "react"
import Layout from "../components/layout";
import Tile from "../components/tile"

import { Link } from "gatsby";

const IndexPage = () => (
  <Layout>
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
        <h1>Application Stacks</h1>
        <p id="application-stack-info">Select the application pack to view details, then copy the command toclone it using your CLI or view the packs in GitHub.</p>
      </div>
      <div className="container">
        <div id="application-stacks" className="row">
            <Tile heading="Java MicroProfile"/>
            <Tile heading="Java Spring"/>
            <Tile heading="Node.JS"/>
            <Tile heading="Swift"/>
        </div>
      </div>


      </section>
    </div>
  </Layout>
)

export default IndexPage
