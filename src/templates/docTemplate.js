import React from "react"
import { graphql } from "gatsby"

import Doc from "../components/doc";
import Layout from "../layouts"

export default function Template({
  data,
}) {
  const { markdownRemark } = data
  const { html } = markdownRemark

  return (
    <Layout pageSource="docs">
      <Doc html={html}/>
    </Layout>
  )
}

export const pageQuery = graphql`
query($path: String!) {
  markdownRemark(fields: { slug: { eq: $path } }) {
    html
  }
}
`
