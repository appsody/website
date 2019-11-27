import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx";

import Doc from "../components/doc";
import Layout from "../components/layout"
import Sidebar from "../components/sidebar";
import SidebarExtender from "../components/sidebar-extender";

export default function Template({
  data
}) {
  const { mdx } = data
  const { html } = mdx
  const { title } = mdx.frontmatter

  return (
    <Layout title={title}>
      <Sidebar />
      <Doc html={html}/>
      <SidebarExtender />
    </Layout>
  )
}

export const pageQuery = graphql`
query($path: String!) {
  mdx(fields: { slug: { eq: $path } }) {
    body
    frontmatter {
      title
    }
  }
}
`
