import React, { useState } from "react"
import "../styles/sidebar-extender.css"


const SidebarExtender = () => {
  window.onresize = resize;
  function resize() {
    if (window.innerWidth <= 767) {
      if (isExpanded) {
        setIsExpanded(!isExpanded) 
        document.getElementById(".hamburger-icon").classList.toggle('open');
      }
      document.getElementById("sidebar").style.marginLeft = "-100vw";
    } else {
      document.getElementById("sidebar").style.marginLeft = "0";
    }
  }
  const [isExpanded, setIsExpanded] = useState(false);

  function moveSidebar() {
    document.getElementById(".hamburger-icon").classList.toggle('open');

    setIsExpanded(!isExpanded) 
    if (!isExpanded) {
      document.getElementById("sidebar").style.marginLeft= "0";      
    } else {
      document.getElementById("sidebar").style.marginLeft = "-100vw";
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