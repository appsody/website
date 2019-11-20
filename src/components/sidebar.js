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
      <Accordion defaultActiveKey={accordionIndex}>
        {
          sidebarList.map((item, index) => {
            if (item.items !== undefined) {
              return (
                <>
                  <Accordion.Toggle as={Button} variant="link" eventKey={index}>
                    <div onClick={()=>rotateImage(index)} className="accordion-dropdown">
                      <h4 className="sidebar-heading-link float-left">{item.title}</h4>
                      <img id={`chevron-${index}`} src={ chevronlogo } width="10" height="10" className="accordion-icon mb-3" alt="Chevron Logo"></img>
                    </div>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey={index}>
                    <ul>
                      {item.items.map(subItem => <li key={subItem.title} className="my-1 p-1"><Link className="sidebar-link ml-3" onMouseOver={()=>setAccordionIndex(index)} activeClassName="active" to={subItem.path}>{subItem.title}</Link></li>)}
                    </ul>
                  </Accordion.Collapse>
                </>
              )
            } else {
              return (
                <h4 className="sidebar-heading-link"> <Link onClick={()=>setAccordionIndex(index)}  activeClassName="active" to={item.path}>{item.title}</Link></h4>
              )
            }
          })
        }
      </Accordion>
    </aside>
  )
}

export default Sidebar;