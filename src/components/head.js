import React from "react";
import { Helmet } from "react-helmet";

import 'bootstrap/dist/js/bootstrap.bundle';

export default () => (
    <Helmet>
      <meta charset="UTF-8"></meta>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"></link>
      <link rel="stylesheet" type="text/css" href="../stylesheets/main.css"></link>
      <title>Appsody</title>
    </Helmet>
)
