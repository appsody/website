import React from "react";

import Layout from "../components/layout";
import DocLayout from "../components/docLayout";
import DocSidebar from "../components/docSidebar.js";

export default ({ children, pageContext }) => {
  if (pageContext.layout === "docs") {
    return (
      <DocLayout>
          <div id="docs">
            <DocSidebar/>
              <main>
                {children}
              </main>
            </div>
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
