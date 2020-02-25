import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Blog from "../components/blog"

export default function Template({
  data
}) {
  const { markdownRemark } = data
  const { html } = markdownRemark
  const { title } = markdownRemark.frontmatter.title

  return (
    <Layout title={title}>
         <Blog html={html} author={markdownRemark.frontmatter.author} date={markdownRemark.frontmatter.date}/>   
    </Layout>
  )
}

export const pageQuery = graphql`
query($path: String!) {
  markdownRemark(fields: { slug: { eq: $path } }) {
    html
    frontmatter {
      title
      author
      date
    }
  }
}
`
