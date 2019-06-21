import React from "react"
import Layout from "../components/layout";
import Tile from "../components/tile"

import githubIcon from "../../static/images/header_github_icon.svg";
import twitterIcon from "../../static/images/header_twitter_icon.svg";
import slackIcon from "../../static/images/header_slack_icon.svg";

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
            <Tile id="java-MicroProfile" heading="Java MicroProfile" image={githubIcon}/>
            <Tile id="java-spring" heading="Java Spring" image={twitterIcon}/>
            <Tile id="node" heading="Node.js" image={slackIcon}/>
            <Tile id="swift" heading="Swift" image={slackIcon}/>
        </div>
      </div>
      </section>
      <section className="landing-section">

      </section>
      <section className="landing-section text-center">
        <h2 className="mb-5">Why Appsody?</h2>
        <div className="row">
          <div className="col border mx-4 py-5">
            Graph or graphic and information
          </div>
          <div className="col border mx-4 py-5">
            Graph or graphic and information
          </div>
          <div className="col border mx-4 py-5">
            Graph or graphic and information
          </div>
        </div>
      </section>
    </div>
  </Layout>
)

export default IndexPage
