import React, { useState } from "react"
import "../styles/sidebar-extender.css"

window.sidebarOpen= true;

const SidebarExtender = () => {
  if (typeof window !== 'undefined') {
    window.onresize = resize;
  }
  function resize() {
    document.getElementById("desktopHamburgerOpenbtnId").style.display = "none"; 
    document.getElementById("appsody-sidebar-header").style.writingMode = "horizontal-tb"; 
    document.getElementById("appsody-sidebar-header").style.marginLeft = "1.5rem"; 
    document.getElementById("docs-sidebar-header").style.writingMode = "horizontal-tb";
    document.getElementById("docs-sidebar-header").style.marginLeft = "0.25em";
    if (window.innerWidth <= 767) {
      if (isExpanded) {
        setIsExpanded(!isExpanded) 
        document.getElementById("hamburger-icon").classList.toggle('open');
      }
      document.getElementById("sidebar").style.marginLeft = "-100vw";
      document.getElementById("desktop-hamburger-icon" ).style.marginLeft= "-100vw"; 
      document.getElementById("documents-window").style.paddingLeft = "2em"; 
    } else {
      if(window.sidebarOpen) {
        document.getElementById("sidebar").style.marginLeft = "0";
        document.getElementById("desktop-hamburger-icon" ).style.marginLeft= "0"; 
        document.getElementById("documents-window").style.paddingLeft = "23em";  
        document.getElementById("appsody-sidebar-header").style.writingMode = "horizontal-tb"; 
        document.getElementById("appsody-sidebar-header").style.marginLeft = "1.5rem"; 
        document.getElementById("docs-sidebar-header").style.writingMode = "horizontal-tb";
        document.getElementById("docs-sidebar-header").style.marginLeft = "0.25em";
      } else {
        document.getElementById("sidebar").style.marginLeft= "-17.6em";
        document.getElementById("desktopHamburgerOpenbtnId").style.display = "inline"; 
        document.getElementById("appsody-sidebar-header").style.writingMode = "vertical-rl";
        document.getElementById("appsody-sidebar-header").style.marginLeft = "9.3em"; 
        document.getElementById("docs-sidebar-header").style.writingMode = "vertical-rl";
        document.getElementById("docs-sidebar-header").style.marginLeft = "9.3em"; 
      }
    }
  }
  const [isExpanded, setIsExpanded] = useState(false);

  function moveSidebar() {
    document.getElementById("hamburger-icon").classList.toggle('open');

    setIsExpanded(!isExpanded) 
    window.sidebarOpen = !isExpanded;
    if (!isExpanded) {
      document.getElementById("sidebar").style.marginLeft= "0";      
    } else {
      document.getElementById("sidebar").style.marginLeft = "-100vw";
    }
  }

  return (
    <section onClick={() => moveSidebar()} className="burger-icon" id="hamburger-icon">
      <span></span>
      <span></span>
      <span></span>
    </section>
  )
}

export default SidebarExtender