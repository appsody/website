import React from "react";
import { Link } from "gatsby";

const WideBlogPost = ({title, subtext, author, date, slug}) => (

    <Link className="blog-link" to={slug}>
    <div className="wide-blog-container">
        <div className="wide-blog-image-container">
            <img className="wide-blog-image" src={"https://miro.medium.com/max/2800/1*AmrAV709WQFlXgs4R4zZEw.jpeg"} alt="Blog post pic"/>
        </div>
        <h2 className="wide-blog-title">{title}</h2>
        <p className="wide-blog-subtext">{subtext}</p>
        <p className="wide-blog-author">by {author}</p>
        <p className="wide-blog-date">Posted {date}</p>
    </div>
    </Link>
)

export default WideBlogPost;