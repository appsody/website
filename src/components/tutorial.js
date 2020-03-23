import React from "react";

class Doc extends React.Component {
    render() {
            return (
                <div id="documents-window" className="doc-content tutorial" dangerouslySetInnerHTML={{ __html: this.props.html }} />
            )
    }

}

export default Doc;