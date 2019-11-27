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
  const { mdx } = data.mdx
  // const { body } = data.mdx.rawBody
  const { title } = data.mdx.frontmatter

  console.log(data.mdx.rawBody)
  return (
    <Layout title={data.mdx.frontmatter.title}>
      <Sidebar />
      <Doc html={data.mdx.rawBody}/>
      <SidebarExtender />
    </Layout>
  )
}

export const pageQuery = graphql`
query($path: String!) {
  mdx(fields: { slug: { eq: $path } }) {
    rawBody
    frontmatter {
      title
    }
  }
}
`
