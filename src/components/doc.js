import React from "react";

class Doc extends React.Component {
    componentDidMount() {

        // Trim .md
        const links = document.querySelectorAll('a');
        links.forEach(link => {
            const href = link.href;
            if (href.includes('appsody.dev') || href.includes('localhost')) {
                link.href = href.replace(".md", "").replace("/content/docs", "/docs");
            }
        })
    }

    render() {
        return (
            <div className="doc-content" dangerouslySetInnerHTML={{ __html: this.props.html }} />
        )
    }

}

export default Doc;