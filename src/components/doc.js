import React from "react";
import { MDXRenderer } from "gatsby-plugin-mdx";

class Doc extends React.Component {
    render() {
        console.log(this)
        if(this.props.path.includes("glossary")) {
            return (
                <>
                <div id="documents-window" className="glossary-content">
                    <MDXRenderer>{this.props.body}</MDXRenderer>
                </div>
                </>
            )
        } else {
            return (
                <>
                <div id="documents-window" className="doc-content">
                    <MDXRenderer>{this.props.body}</MDXRenderer>
                </div>
                </>
            )
        }

    }

}

export default Doc;