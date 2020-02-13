import React from "react"
import { graphql } from 'gatsby'

import Layout from "../components/layout"

import WideBlogPost from "../components/wideBlogPost";
import BlogPostGrid from "../components/blogPostGrid";


const Blogs = ({data}) => {
    return (
        <Layout title="Appsody - Blogs">
            <div className="container">
              <section className="blog-card-section">
                  <h2>Latest Blog</h2>
                  <WideBlogPost image={data.allMarkdownRemark.nodes[0].frontmatter.imagePath} title={data.allMarkdownRemark.nodes[0].frontmatter.title} subtext={data.allMarkdownRemark.nodes[0].excerpt.replace(data.allMarkdownRemark.nodes[0].frontmatter.title, "")} author={data.allMarkdownRemark.nodes[0].frontmatter.author} date={data.allMarkdownRemark.nodes[0].frontmatter.date} slug={data.allMarkdownRemark.nodes[0].fields.slug}/>
              </section>
            </div>
            <div className="container">
              <section className="all-blogs-section">
                    <h2>All Blogs</h2>
                    <BlogPostGrid/>
              </section>
            </div>
        </Layout>
        )
}

export const query = graphql`
query BlogsQuery {
    allMarkdownRemark(
      filter: {fileAbsolutePath: {regex: "/blogs/"}}
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

export default Blogs;