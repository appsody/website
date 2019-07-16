import React from "react";
import * as loadScript from 'simple-load-script';
import { Helmet } from "react-helmet";

class Head extends React.Component {

    async componentDidMount() {
        await loadScript('https://code.jquery.com/jquery-3.3.1.slim.min.js', { inBody: true });
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js', { inBody: true });
        await loadScript('https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js', { inBody: true });
    }

    render() {
        return (
            <Helmet>
                <meta charset="UTF-8"></meta>
                <title>Appsody - Compose a Cloud Native Masterpiece</title>
                <meta name="description" content="Infused with cloud native capabilities from the moment you start, Appsody provides everything you need to iteratively develop applications, ready for deployment to Kubernetes environments. Teams are empowered with sharable technology stacks, configurable and controllable through a central hub." />
                <meta name="keywords" content="appsody, development, microservice, kubernetes, cloud-native, cloud, java, nodejs, swift, spring, microprofile" />
                <meta property="og:title" content="Appsody - Compose a Cloud Native Masterpiece" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="http://appsody.dev/" />
            </Helmet>
        )
    }
}

export default Head;
