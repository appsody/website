import React from "react";

import Layout from "../components/layout";
import DocSidebar from "../components/docSidebar.js";

export default ({ children, pageContext }) => {
  if (pageContext.layout === "docs") {
    return (
      <Layout>
          <div id="docs">
            <DocSidebar/>
              <main>
                {children}
              </main>
            </div>
      </Layout>
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
