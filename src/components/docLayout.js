import React from "react";

import DocHead from "./docHead"
import Navbar from "./navbar"
import Footer from "../components/footer"
import MobileNav from "../components/mobileNav";

export default ({ children }) => (
    <React.Fragment>
        <DocHead/>
        <Navbar/>
        { children }
        <Footer/>
        <MobileNav />
    </React.Fragment>
)
