import React from "react"
import { graphql } from "gatsby"

import Doc from "../components/doc";
import Layout from "../components/layout"
import Sidebar from "../components/sidebar";
import SidebarExtender from "../components/sidebar-extender";

export default function Template({
  data
}) {
  return (
    <Layout title={data.mdx.frontmatter.title}>
      <Sidebar />
      <Doc body={data.mdx.body} path={data.mdx.fileAbsolutePath}/>
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
    fileAbsolutePath
  }
}
`
