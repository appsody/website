import React from "react"
import Layout from "../components/layout";

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
                <a href="/" className="btn btn-primary mr-2 w-50" role="button">Get Started</a>
                <a href="/" className="btn btn-clear w-50" role="button">Why Appsody</a>
              </div>
            </div>
            <div className="col d-none d-md-inline border border-dark">
              Gif
            </div>
          </div>
      </section>
      <section className="landing-section">
        <h1>Application Stacks</h1>
      </section>
    </div>
  </Layout>
)

export default IndexPage
