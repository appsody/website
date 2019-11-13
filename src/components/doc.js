import React from "react";

class Doc extends React.Component {
    render() {
        return (
            <div className="doc-content" dangerouslySetInnerHTML={{ __html: this.props.html }} />
        )
    }

}

export default Doc;