import React from "react";

class MyRedirect extends React.Component {
  componentDidMount() {
    window.location.replace("https://medium.com/appsody");
  }

  render() {
    return null;
  }
}

export default MyRedirect;