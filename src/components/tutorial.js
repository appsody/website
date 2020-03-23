import React from "react";

class Tutorial extends React.Component {
    render() {
            return (
                <div id="documents-window" className="doc-content tutorial" dangerouslySetInnerHTML={{ __html: this.props.html }} />
            )
    }

}

export default Tutorial;