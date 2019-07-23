import React from "react";

class Redirect extends React.Component {
  componentDidMount() {
    window.location.replace(this.props.to);
  }

  render() {
    return null;
  }
}

export default Redirect;