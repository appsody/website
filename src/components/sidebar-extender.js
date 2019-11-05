import React, { useState } from "react"
import styles from "../styles/sidebar-extender.module.css"

const SidebarExtender = () => {

  const [isExpanded, setIsExpanded] = useState(false);

  function moveSidebar() {
   document.getElementById("sidebar").style.display = 'inline';

    setIsExpanded(!isExpanded)
    const sidebar = document.querySelector('#sidebar');
    const docsWindow = document.querySelector('#documents-window');
    const animationTimings = {
      fill: "forwards",
      duration: 250,
      iterations: 1
    };
    if (!isExpanded) {

      sidebar.animate([
        {
          transform: "translateX(calc(-100vw))",
        },
        {
          transform: "translateX(0)",
        }
      ], animationTimings);

      docsWindow.animate([
        {
          transform: "translateX(calc(-100vw))",
        },
        {
          transform: "translateX(0)",
        }
      ], animationTimings)
      
    } else {
      sidebar.animate([
        {
          transform: "translateX(0)"
        },
        {
          transform: "translateX(calc(-100vw))"
        }
      ], animationTimings);

      docsWindow.animate([
        {
          transform: "translateX(0)",
        },
        {
          transform: "translateX(calc(-100vw))",
        }
      ], animationTimings)
    }
  }

  return (
    <section onClick={() => moveSidebar()} className={styles.burgerIcon}>
      <div className={styles.line}></div>
      <div className={styles.line}></div>
      <div className={styles.line}></div>
    </section>
  )
}

export default SidebarExtender