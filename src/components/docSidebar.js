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
                    props.data.map(doc => <li className="my-1"><Link to={doc.path}>{doc.title}</Link></li>)
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
        <nav className="navbar-expand-md navbar-light border-bottom" id="docs-sidebar">
          <button className="navbar-toggler float-right" type="button" data-toggle="collapse" data-target="#collapsingSideNavbar">
              <span className="navbar-toggler-icon"></span>
          </button>
          <div className="navbar-expand-md collapse d-md-inline" id="collapsingSideNavbar">
            {list}
          </div>
        </nav>
    )
}

export default (props) => (
    <StaticQuery
      query={graphql`
        query {
            allMarkdownRemark {
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
