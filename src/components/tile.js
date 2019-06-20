import React from "react";

class Tile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  render() {
    if (this.state.isToggleOn) {
      return (
        <div className="card">
        <h5 id="tile-head">{this.props.heading}</h5>
        <p id="tile-text">Description goes in space</p>
        <a href="/" onClick={this.handleClick} className="btn btn-clear w-70" role="button">Select</a>
        </div>
      );
    } else {
      return (
        <div className="card flip">
        <h5 id="tile-head">{this.props.heading}</h5>
        <p id="tile-text">Command for CLI</p>
        <input type="text" name="cli" value="url-link-goes-here" readOnly></input>
        <br/>
        <a href="/" onClick={this.handleClick} className="btn btn-primary w-70" role="button">View in GitHub</a>
        </div>
      );
    }
  }
}

export default Tile;
