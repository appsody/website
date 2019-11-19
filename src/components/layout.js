import React from "react";

import Head from "./head"
import Navbar from "./navbar"
import Footer from "./footer"
import MobileNav from "./mobileNav";

const Layout = ({ title, children }) => (
    <React.Fragment>
        <Head title={title}/>
            <Navbar/>
                { children }
            <Footer/>
        <MobileNav />
    </React.Fragment>
)

export default Layout;
