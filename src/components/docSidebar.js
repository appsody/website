import React from "react";
import { Link, StaticQuery, graphql } from "gatsby"

const DocSection = (props) => {

    return (
        <React.Fragment>
            {
                (props.title !== "null") ? <h4>{props.title}</h4> : null
            }
            <ul>
                {
                    props.data.map(doc => <li><Link to={doc.path}>{doc.title}</Link></li>)
                }
            </ul>
        </React.Fragment>
    );
}

const DocSidebar = ({ data }) => {
    const docs = data.allMarkdownRemark.nodes;
    const sections = {};
    sections["null"] = [];

    docs.forEach(doc => {
        const data = doc.frontmatter;
        if (!sections[data.section]) sections[data.section] = [];
        sections[data.section].push({
            title: data.title,
            path: data.path,
            weight: data.weight
        });
    });

    let list = [];
    list.push(<DocSection key={sections["null"].title} title={"null"} data={sections["null"]}/>)
    delete sections["null"];

    for (let section in sections) {
        list.push(<DocSection key={sections[section].title} title={section} data={sections[section]}/>)
    }    
   
    return (
        <nav id="docs-sidebar" className="sidebar bg-light">
            {list}
        </nav>
    )
}

export default (props) => (
    <StaticQuery
      query={graphql`
        query {
            allMarkdownRemark(sort: {fields: frontmatter___section}) {
                nodes {
                    frontmatter {
                        section
                        title
                        path
                    }
                }
            }
        }
      `}
      render={data => <DocSidebar data={data} {...props} />}
    />
  )