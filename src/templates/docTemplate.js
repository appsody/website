import React from "react"
import { graphql } from "gatsby"

import Doc from "../components/doc";

export default function Template({
  data,
}) {
  const { markdownRemark } = data
  const { html } = markdownRemark

  return (
      <Doc html={html}/>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
      }
    }
  }
`
