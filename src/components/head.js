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
                <title>Appsody</title>
            </Helmet>
        )
    }
}

export default Head;
