import React from "react"
import { graphql } from 'gatsby'

import Layout from "../components/layout"

import TutorialGrid from "../components/tutorialGrid";


const Tutorials = ({data}) => {
    return (
        <Layout title="Appsody - Tutorials" className="tutorials-page">
            <div className="container tutorials-section tutorials-page">
              <section className="all-tutorials-section">
                    <h2 className="tutorials-header">Tutorials</h2>
                    <TutorialGrid/>
              </section>
            </div>
        </Layout>
        )
}

export const query = graphql`
query TutorialsQuery {
    allMarkdownRemark(
      filter: {fileAbsolutePath: {regex: "/tutorials/"}}
      sort: {
        fields: [frontmatter___date]
        order: DESC
      }
      ) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
          date(fromNow: true)
          author
        }
        excerpt(pruneLength: 450)
      }
    }
  }
`

export default Tutorials;