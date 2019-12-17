import React from "react"
import styles from "../styles/desktopSidebarOpenButton.module.css"


const DesktopSidebarOpenButton = () => {
    function openDesktopSidebar() {
        window.sidebarOpen = true;
        document.getElementById("accordion").style.display="block"
        document.getElementById("sidebar").style.marginLeft= "0";
        document.getElementById("desktop-hamburger-icon" ).style.marginLeft= "0"; 
        document.getElementById("documents-window").style.paddingLeft = "23em";    
        document.getElementById("desktopHamburgerOpenbtnId").style.display = "none";   
        document.getElementById("appsody-sidebar-header").style.writingMode = "horizontal-tb"; 
        document.getElementById("appsody-sidebar-header").style.marginLeft = "1.5rem"; 
        document.getElementById("docs-sidebar-header").style.writingMode = "horizontal-tb";
        document.getElementById("docs-sidebar-header").style.marginLeft = "0.25em"; 
      }

  return (
    <section  id="desktopHamburgerOpenbtnId" className={styles.desktopHamburgerOpenbtn} onClick={() => openDesktopSidebar()}>
      <span></span>
      <span></span>
      <span></span>
    </section>
  )
}

export default DesktopSidebarOpenButton