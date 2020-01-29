import React, { Component } from "react";
import { Link } from "gatsby";

const WideBlogPost = ({title, subtext, author, date, image, slug}) => (

    <Link className="blog-link" to={slug}>
    <div className="wide-blog-container">
        <div className="wide-blog-image-container">
            <img className="wide-blog-image" src={"http://localhost:8000/static/e05283c91c0cc09f39645b4b283a68a7/8dcf2/autumn.jpg"}/>
        </div>
        <h2 className="wide-blog-title">{title}</h2>
        <p className="wide-blog-subtext">{subtext}</p>
        <p className="wide-blog-author">by {author}</p>
        <p className="wide-blog-date">Posted {date}</p>
    </div>
    </Link>
)

export default WideBlogPost;