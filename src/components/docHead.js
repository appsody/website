import React from "react";
import * as loadScript from 'simple-load-script';
import SEO from "../components/SEO";
import { StaticQuery, graphql } from "gatsby";

class DocHead extends React.Component {

    async componentDidMount() {
        await loadScript('https://code.jquery.com/jquery-3.3.1.slim.min.js', { inBody: true });
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js', { inBody: true });
        await loadScript('https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js', { inBody: true });
    }
}

export default () => (
    <StaticQuery
      query={graphql`
        query {
            allMarkdownRemark(filter: {fileAbsolutePath: {regex: "content/docs/using-appsody/cli-commands/"}}) {
              nodes {
                headings(depth: h1) {
                  value
                }
              }
            }
          }
      `}
      render={data => {
          
        let heading = data.allMarkdownRemark.nodes[0].headings[0].value;

        
        return <SEO title={heading}></SEO>
      }}
    />
)
