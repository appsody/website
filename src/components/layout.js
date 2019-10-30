import React from "react";

import Head from "./head"
import Navbar from "./navbar"
import Footer from "./footer"
import MobileNav from "./mobileNav";

export default ({ children }) => (
    <React.Fragment>
        <Head/>
            <Navbar/>
                { children }
            <Footer/>
        <MobileNav />
    </React.Fragment>
)
