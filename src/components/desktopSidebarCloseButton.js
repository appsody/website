import React from "react"
import "../styles/desktopSidebarCloseButton.css"


const DesktopSidebarExtender = () => {
  function closeSidebar() {
      window.sidebarOpen = false;
      document.getElementById("accordion").style.display="none"
      document.getElementById("sidebar").style.marginLeft= "-17em";
      document.getElementById("desktop-hamburger-icon" ).style.marginLeft= "-25em"; 
      document.getElementById("documents-window").style.paddingLeft = "8em";    
      document.getElementById("desktopHamburgerOpenbtnId").style.display = "inline";   
      document.getElementById("appsody-sidebar-header").style.writingMode = "vertical-rl";
      document.getElementById("appsody-sidebar-header").style.marginLeft = "9.2em"; 
      document.getElementById("docs-sidebar-header").style.writingMode = "vertical-rl";
      document.getElementById("docs-sidebar-header").style.marginLeft = "9.2em"; 
  }

  return (
      <section onClick={() => closeSidebar()} className="desktop-sidebar-hamburger" id="desktop-hamburger-icon">
        <span></span>
        <span></span>
        <span></span>
        <p>Hide Sidebar</p>
      </section>
  )
}

export default DesktopSidebarExtender