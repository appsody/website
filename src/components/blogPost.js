import React, { Component } from "react";
import { Link } from "gatsby";

const BlogPost = ({title, subtext, author, date, slug}) => (

    <Link className="blog-link" to={slug}>
    <div className="blog-container">
        <h2 className="blog-title">{title}</h2>
        <p className="blog-subtext">{subtext}</p>
        <p className="blog-author">by {author}</p>
        <p className="blog-date">Posted {date}</p>
    </div>
    </Link>
)

export default BlogPost;