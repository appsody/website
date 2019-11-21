import React from "react";
import { Link } from "gatsby"
import sidebarList from "../../content/docs/sidebar.yaml";
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'
import chevronlogo from "../images/chevron.svg";

import styles from "../styles/sidebar.module.css";

let accordionIndex = 0;
let lastIndex = null;
let rotated = false;
let img;

const Sidebar = () => {
  const setAccordionIndex = (index) => {
    img = document.getElementById(`chevron-${index}`);
    img.style.transform = 'rotate(90deg)';
    rotated = true
    accordionIndex = index
  }

  const rotateImage = (index) => {
    if (lastIndex !== index && lastIndex !== null){
      img = document.getElementById(`chevron-${lastIndex}`);
      img.style.transform = 'rotate(0)';
      rotated = false
    }

    if (!rotated) {
      img = document.getElementById(`chevron-${index}`);
      img.style.transform = 'rotate(90deg)';
      rotated = true
    } else {
      img = document.getElementById(`chevron-${index}`);
      img.style.transform = 'rotate(0)';
      rotated = false
    } 
    lastIndex = index
  }

  return (
    <aside id="sidebar" className={styles.sidebar}>
      <h2 className="docs-header-text">Appsody</h2>
      <h2 className="docs-header-text docs-header-pink">Docs</h2>
      <Accordion defaultActiveKey={accordionIndex}>
        {
          sidebarList.map((item, index) => {
            if (item.items !== undefined) {
              return (
                <>
                  <Accordion.Toggle variant="link" eventKey={index} className="sidebar-heading-link">
                    <div onClick={()=>rotateImage(index)} className="accordion-dropdown">
                      <h3 className="float-left">{item.title} </h3>
                      <img id={`chevron-${index}`} src={ chevronlogo } width="10" height="10" className="accordion-icon" alt="Chevron Logo"></img>
                    </div>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey={index}>
                    <ul className="doc-sidebar-hidden-list">
                      {item.items.map(subItem => <li key={subItem.title} className="my-3"><Link className="sidebar-link" onMouseOver={()=>setAccordionIndex(index)} activeClassName="active-docs" to={subItem.path}>{subItem.title}</Link></li>)}
                    </ul>
                  </Accordion.Collapse>
                </>
              )
            } else {
              return (
                <h3 className="sidebar-heading-link"> <Link onClick={()=>setAccordionIndex(index)}  activeClassName="active" to={item.path}>{item.title}</Link></h3>
              )
            }
          })
        }
      </Accordion>
    </aside>
  )
}

export default Sidebar;