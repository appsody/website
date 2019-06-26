import React from "react";

class Doc extends React.Component {
    componentDidMount() {
        // Linking between sections on the same document
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headings.forEach(heading => {
            heading.id = heading.innerText.replace(/ /g, "-");
        });

        // Trim .md
        const links = document.querySelectorAll('a');
        links.forEach(link => {
            const href = link.href;
            if (href.includes('appsody.dev') || href.includes('localhost')) {
                link.href = href.replace(".md", "");
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