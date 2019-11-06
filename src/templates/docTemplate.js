import React from "react"
import { graphql } from "gatsby"

import Doc from "../components/doc";
import Layout from "../layouts"
import DocHead from "../components/docHead";
import DocSidebar from "../components/docSidebar";

export default function Template({
  data
}) {
  const { markdownRemark } = data
  const { html } = markdownRemark
  const { title } = markdownRemark.frontmatter

  return (
    <Layout pageSource="docs">
      <DocSidebar />
      <DocHead title={title}></DocHead>
      <Doc html={html}/>
    </Layout>
  )
}

export const pageQuery = graphql`
query($path: String!) {
  markdownRemark(fields: { slug: { eq: $path } }) {
    html
    frontmatter {
      title
    }
  }
}
`
