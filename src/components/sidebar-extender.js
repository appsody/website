import React, { useState } from "react"
import "../styles/sidebar-extender.css"

const SidebarExtender = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  function moveSidebar() {
    document.getElementById(".hamburger-icon").classList.toggle('open');

    setIsExpanded(!isExpanded) 
    if (!isExpanded) {
      document.getElementById("sidebar").style.marginLeft= "0";      
    } else {
      document.getElementById("sidebar").style.marginLeft = "-85vw";
    }
  }

  return (
    <section onClick={() => moveSidebar()} className="burger-icon" id=".hamburger-icon">
      <span></span>
      <span></span>
      <span></span>
    </section>
  )
}

export default SidebarExtender