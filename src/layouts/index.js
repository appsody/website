import React from "react";

import Layout from "../components/layout";
import DocLayout from "../components/docLayout";
import DocSidebar from "../components/docSidebar";

export default ({ children, pageSource }) => {
  if (pageSource === "docs") {
    return (
      <div id="docs">
      <DocLayout>
            <DocSidebar/>
            <main>
              {children}
            </main>
      </DocLayout>
      </div>
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
