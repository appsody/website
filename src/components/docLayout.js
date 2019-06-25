import React from "react";

import Head from "./head"
import DocNavbar from "./docNavbar"

export default ({ children }) => (
    <React.Fragment>
        <Head/>
        <DocNavbar/>
        { children }
    </React.Fragment>
)
