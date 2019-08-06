import React from "react";
import { Link } from "gatsby"
import SearchContainer from "./SearchContainer";
import navStructure from "../../content/docs/sidebar.yaml";

const DocSection = (props) => {
    return (
        <React.Fragment>
            {
                (props.title !== "null") ? <h4>{props.title}</h4> : null
            }
            <ul>
                {
                    props.data.map(doc => <li key={doc.title} className="my-1"><Link activeClassName="active" to={doc.path}>{doc.title}</Link></li>)
                }
            </ul>
        </React.Fragment>
    );
}

const DocSidebar = () => {
    let list = [];
    for (let section of navStructure) {
        list.push(<DocSection key={section.title} title={section.title} data={section.items}/>)
    }

    return (
        <nav className="navbar-expand-md navbar-light border-bottom" id="docs-sidebar">
          <SearchContainer/>
          <button className="navbar-toggler float-right" type="button" data-toggle="collapse" data-target="#collapsingSideNavbar">
              <span className="navbar-toggler-icon"></span>
          </button>
          <div className="navbar-expand-md collapse d-md-inline" id="collapsingSideNavbar">
            {list}
          </div>
        </nav>
    )
}

export default DocSidebar;
