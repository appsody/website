import React from "react";

class Doc extends React.Component {
    render() {
        if(this.props.title === "Glossary") {
            return (
                <div id="documents-window" className="glossary-content" dangerouslySetInnerHTML={{ __html: this.props.html }} />
            )
        } else {
            return (
                <div id="documents-window" className="doc-content" dangerouslySetInnerHTML={{ __html: this.props.html }} />
            )
        }
    }

}

export default Doc;