import React, { Component } from "react";
import { StaticQuery, graphql } from "gatsby";
import TutorialCard from "../components/tutorialCard";

class TutorialGrid extends Component {

    generateBlogs() {
        const allTutorials = this.props.tutorials.map(tutorial => {

            return <TutorialCard title={tutorial.frontmatter.title} subtext={tutorial.excerpt.replace(tutorial.frontmatter.title, "")} length={tutorial.frontmatter.length} slug={tutorial.fields.slug}/>

        });

        return allTutorials;
    }


    render() {

        return (
            <div className="container">
                <div className="blog-grid">
                    {this.generateBlogs()}
                </div>
            </div>
        );
    }

}

export default () => (
    <StaticQuery
      query={graphql`
      query {
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
              length
            }
            excerpt(pruneLength: 280)
          }
        }
      }
      `}
      render={data => {
        let tutorials = [];
        data.allMarkdownRemark.nodes.forEach(node => {
            tutorials = tutorials.concat(node);
        });


        return <TutorialGrid tutorials={tutorials}/>
      }}
    />
  )
