import React from "react"
import { Link } from "gatsby"
import styles from "../styles/mobileNav.module.css"

const MobileNav = () => {

  return (
    <nav className={styles.mobileNav}> 
      <Link className={styles.navLink} to="/">Home</Link>

      <Link className={styles.navLink} to="/docs">Docs</Link> 

      <Link className={styles.navLink} to="/stacks">Stacks</Link> 

      <a className={styles.navLink} href="/blogs">Blogs</a>

    </nav>
  )
}

export default MobileNav