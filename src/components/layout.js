import React from "react";

import Head from "./head"
import Navbar from "./navbar"
import Footer from "./footer"

export default ({ children }) => (
    <React.Fragment>
        <Head/>
        <Navbar/>
        { children }
        <Footer/>
    </React.Fragment>
)
