import React, { Component } from "react"
import { Link } from "gatsby"
import Search from "./search";
import navStructure from "../../content/docs/sidebar.yaml";

class DocSection extends Component {
  closeDocDropdown = () => {
    document.getElementById("collapsingSideNavbar").classList.remove("show");
  }

  render() {
    let itemList;
    if (this.props.data !== undefined) {
      itemList = (
        <>
          <h4>{this.props.title}</h4>
          <ul>
            {
            this.props.data.map(doc => <li key={doc.title} className="my-1"><Link className="sidebar-link" onClick={this.closeDocDropdown} activeClassName="active" to={doc.path}>{doc.title}</Link></li>)
            }
          </ul>
        </>
      )
    } else {
      itemList = (
        <h4 className="sidebar-heading-height"> <Link className="sidebar-heading-link" onClick={this.closeDocDropdown} activeClassName="active" to={this.props.path}>{this.props.title}</Link></h4>
       
      )
    }
    return (
      <React.Fragment>
        {
          itemList
        }
        
      </React.Fragment>
    );
  }
}

const DocSidebar = () => {
  let list = [];
  for (let section of navStructure) {
    list.push(<DocSection key={section.title} path={section.path} title={section.title} data={section.items}/>)    
  }

  return (
    <nav className="navbar-expand-md navbar-light border-bottom" id="docs-sidebar">
      <Search/>
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
