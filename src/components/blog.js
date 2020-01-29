import React from "react";

class Blog extends React.Component {
    render() {
            return (
                <div id="documents-window" className="blog-content" author={this.props.author} dangerouslySetInnerHTML={{ __html: this.props.html }} />
            )
    }

}

export default Blog;