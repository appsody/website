import React from "react";

import Layout from "../components/layout";
import DocLayout from "../components/docLayout";
import DocSidebar from "../components/docSidebar";
import SidebarExtender from "../components/sidebar-extender";

export default ({ children, pageSource }) => {
  if (pageSource === "docs") {
    return (
      <DocLayout>
            <main>
              {children}
            </main>
            <div id="documents-window" className="docs-window" dangerouslySetInnerHTML={{__html: children.html}}></div>
            <SidebarExtender />
      </DocLayout>
    )
  }
  return (
      <Layout>
        <main>
          {children}
        </main>
      </Layout>
  )
}
