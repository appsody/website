import React, { Component } from "react"
import { Link } from "gatsby"
import Search from "./search";
import navStructure from "../../content/docs/sidebar.yaml";
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'
import chevronlogo from "../images/chevron.svg";

var accordionIndex = 0;
var lastIndex = null;
var rotated = false;
var img;
class DocSection extends Component {

  setAccordionIndex = () => {    
    img = document.getElementById(`chevron-${this.props.index}`);
    img.style.transform = 'rotate(90deg)';
    rotated = true
    accordionIndex = this.props.index
  }

  rotateImage() {
    if (lastIndex !== this.props.index && lastIndex !== null){
      img = document.getElementById(`chevron-${lastIndex}`);
      img.style.transform = 'rotate(0)';
      rotated = false
    }

    if (!rotated) {
      img = document.getElementById(`chevron-${this.props.index}`);
      img.style.transform = 'rotate(90deg)';
      rotated = true
    } else {
      img = document.getElementById(`chevron-${this.props.index}`);
      img.style.transform = 'rotate(0)';
      rotated = false
    } 
    lastIndex = this.props.index
  }

  render() {
    let itemList;
    if (this.props.data !== undefined) {
      itemList = (
        <>
          <Accordion.Toggle as={Button} variant="link" eventKey={this.props.index}>
            <h4 onClick={()=>this.rotateImage()} className="sidebar-heading-link">{this.props.title}  <img id={`chevron-${this.props.index}`} src={ chevronlogo } width="10" height="10" className="d-inline-block align-top mt-2" alt="Chevron Logo"></img></h4>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={this.props.index}>
            <ul>
              {
              this.props.data.map(doc => <li key={doc.title} className="my-1"><Link className="sidebar-link ml-3" onMouseOver={()=>this.setAccordionIndex()} activeClassName="active" to={doc.path}>{doc.title}</Link></li>)
              }
            </ul>
          </Accordion.Collapse>
          </>
      )
    } else {
      itemList = (
        <h4 className="sidebar-heading-link"> <Link onClick={()=>this.setAccordionIndex(this.props.index)}  activeClassName="active" to={this.props.path}>{this.props.title}</Link></h4>
       
      )
    }
    return (
        <>
        {
          itemList
        }
        </>
    );
  }
}

const DocSidebar = () => {
  let list = [];
  
  navStructure.map((section, index) => {
  let item;
  item = <DocSection key={section.title} path={section.path} title={section.title} data={section.items} index={index}/>
  list.push(item)
  return null
  })

  return (
    <nav className="navbar-expand-md navbar-light border-bottom" id="docs-sidebar">
      <Search/>
      <button className="navbar-toggler float-right" type="button" data-toggle="collapse" data-target="#collapsingSideNavbar">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="navbar-expand-md collapse d-md-inline" id="collapsingSideNavbar">
      <Accordion defaultActiveKey={accordionIndex}>
        {list}
      </Accordion>
      </div>
    </nav>
  )
}

export default DocSidebar;
