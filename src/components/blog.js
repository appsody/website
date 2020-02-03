import React from "react";
import Moment from "moment";

class Blog extends React.Component {
    render() {
            return (
                <>
                <div id="author-date-section" className="author-date" >
                    <h3>By {this.props.author} - Posted {Moment(this.props.date).format("LL")}</h3>
                    <h3></h3>
                </div>
                <div id="documents-window" className="blog-content" dangerouslySetInnerHTML={{ __html: this.props.html }} />
                </>
            )
    }

}

export default Blog;