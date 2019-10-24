import React from "react";

import Head from "./head"
import Navbar from "./navbar"
import Footer from "../components/footer"
import MobileNav from "../components/mobileNav";

export default ({ children }) => (
    <React.Fragment>
        <Head/>
        <Navbar/>
        { children }
        <Footer/>
        <MobileNav />
    </React.Fragment>
)
