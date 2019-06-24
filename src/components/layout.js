import React from "react";

import Head from "./head"
import Navbar from "./navbar"

export default ({ children }) => (
    <React.Fragment>
        <Head/>
        <Navbar/>
        { children }
    </React.Fragment>
)