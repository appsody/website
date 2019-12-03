import React from "react"
import { graphql } from "gatsby"

import Doc from "../components/doc";
import Layout from "../components/layout"
import Sidebar from "../components/sidebar";
import SidebarExtender from "../components/sidebar-extender";
import DesktopSidebarExtender from "../components/desktopSidebarCloseButton";
import DesktopSidebarOpenButton from "../components/DesktopSidebarOpenButton";

export default function Template({
  data
}) {
  const { markdownRemark } = data
  const { html } = markdownRemark
  const { title } = markdownRemark.frontmatter

  return (
    <Layout title={title}>    
      <Sidebar />
      <DesktopSidebarOpenButton/>
      <SidebarExtender />
      <DesktopSidebarExtender/>
      <Doc html={html}/>
    </Layout>
  )
}

export const pageQuery = graphql`
query($path: String!) {
  markdownRemark(fields: { slug: { eq: $path } }) {
    html
    frontmatter {
      title
    }
  }
}
`
