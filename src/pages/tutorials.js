import React from "react";
import TutorialLink from "../components/tutorialLink";

const TutorialPage = () => (
    <React.Fragment>
        <div className="container">
            <section id="tutorials">
                <h1>Tutorials</h1>
                <ul>
                    <TutorialLink link="" title="Package your Node.js app for Cloud with Appsody"/>
                    <TutorialLink link="" title="Package your Node.js app for Cloud with Appsody"/>
                </ul>
            </section>
        </div>
    </React.Fragment>
)

export default TutorialPage
