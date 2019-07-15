import React from "react";
import TutorialLink from "../components/tutorialLink";

const TutorialPage = () => (
    <React.Fragment>
        <div className="container">
            <section id="tutorials">
                <h1>Tutorials</h1>
                <ul>
                    <TutorialLink link="https://medium.com/appsody/overview-c0cf1f2a244c" title={"Building Cloud-Native Apps with Appsody"} abstract={"Appsody provides a set of open source tools and capabilities that simplifies the process of building and deploying applications to Kubernetes that are not just cloud packaged, but that are also cloud native."} author="Chris Bailey" date="15th July 2019" time="4 min"/>

                    <TutorialLink link="https://medium.com/appsody/nodes-cloud-packaged-fe60e29b699d" title={"Package your Node.js app for Cloud with Appsody"} abstract={"Appsody’s nodejs Stack makes it easy to take any existing Node.js application and make it “cloud packaged”. In the following post, you’ll see how to take a sample Node.js application, and package it into a best-practise container image using the Appsody CLI and the nodejsStack."} author="Chris Bailey" date="15th June 2019" time="10 min"/>

                    <TutorialLink link="https://medium.com/appsody/nodejs-express-cloud-native-70022e7d5371" title={"Build a new Cloud Native Express.js app with Appsody"} abstract={"Appsody’s nodejs-express Stack makes it easy to go beyond making an application “cloud packaged” (which you can see how to do with the basic nodejs Appsody Stack), to creating “cloud native” applications which exploit the capabilities of the cloud platform by providing features such as additional built-in “Cloud Native” capabilities such as liveness and readiness, and metrics and observability.."} author="Chris Bailey" date="15th June 2019" time="10 min"/>

                    <TutorialLink link="https://medium.com/appsody/nodejs-express-enablement-f6fc2609bc00" title={"Make your Express.js app Cloud-Native with Appsody"} abstract={"In this article, you’ll see how to take an existing Express.js app, and make it cloud-native by enabling it to work with the same nodejs-express Appsody Stack."} author="Chris Bailey" date="15th June 2019" time="4 min"/>
                </ul>
            </section>
        </div>
    </React.Fragment>
)

export default TutorialPage
