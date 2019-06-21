import React from "react";

import Layout from "../components/layout";
import DocSidebar from "../components/docSidebar.js";

export default ({ children, pageContext }) => {
    if (pageContext.layout === "docs") {
      return (
        <Layout>
            <DocSidebar/>
            {children}
        </Layout>
      )
    }
    return (
        <Layout>
            {children}
        </Layout>
    )
  }