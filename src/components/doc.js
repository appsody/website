import React from "react";
import { MDXRenderer } from "gatsby-plugin-mdx";

class Doc extends React.Component {
    render() {
        return (
            <>
            <div id="documents-window" className="doc-content">
                <MDXRenderer>{this.props.body}</MDXRenderer>
            </div>
            </>
        )
    }

}

export default Doc;