import React from "react";

import Head from "./head"
import DocNavbar from "./docNavbar"
import Footer from "../components/footer"

export default ({ children }) => (
    <React.Fragment>
        <Head/>
        <DocNavbar/>
        { children }
        <Footer/>
    </React.Fragment>
)
