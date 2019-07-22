import React from "react"
import Redirect from "../components/redirect";


const Tutorials = () => (
    <React.Fragment>
        <div id="redirect-page">
            <div className="container">
                <section className="landing-section">
                    <div className="row w-100 mx-auto">
                        <div className="col">
                            <div className="col"></div>
                            <div className="w-75 my-4">
                                <div id="redirect-wrap">
                                    <h2>You are currently being redirected.</h2>
                                    <p id="redirect-link">If you have not been redirected, please click <a href="https://medium.com/appsody">here</a>.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
        <Redirect to="https://medium.com/appsody"/>
    </React.Fragment>
)

export default Tutorials;