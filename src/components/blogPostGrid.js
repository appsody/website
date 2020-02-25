import React, { Component } from "react";
import { StaticQuery, graphql } from "gatsby";
import BlogPost from "../components/blogPost";

class BlogPostGrid extends Component {

    generateBlogs() {
        const allBlogs = this.props.blogs.map(blog => {

            return <BlogPost title={blog.frontmatter.title} subtext={blog.excerpt.replace(blog.frontmatter.title, "").replace("By " + blog.frontmatter.author, "").replace("Posted", "")} author={blog.frontmatter.author} date={blog.frontmatter.date} slug={blog.fields.slug}/>

        });

        return allBlogs;
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
            excerpt(pruneLength: 130)
          }
        }
      }
      `}
      render={data => {
        let blogs = [];
        data.allMarkdownRemark.nodes.forEach(node => {
            blogs = blogs.concat(node);
        });


        return <BlogPostGrid blogs={blogs}/>
      }}
    />
  )
