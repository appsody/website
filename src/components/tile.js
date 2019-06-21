import React from "react";

class Tile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    this.copy = this.copy.bind(this);
  }

  copy() {
    const id = this.props.id
    let copyText = document.querySelector(`#${id} input`);
    copyText.select();
    document.execCommand("copy");
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
          <img id="tile-img" src={this.props.image} alt=""></img>
          <h5 id="tile-heading">{this.props.heading}</h5>
          <a href="/" onClick={this.handleClick} className="btn btn-clear w-50 mx-auto" role="button">Select</a>
        </div>
      );
    } else {
      return (
        <div id={this.props.id} className="card flip">
          <i onClick={this.handleClick} className="fas fa-arrow-left" title="flip card"></i>
          <h5 id="tile-heading">{this.props.heading}</h5>

        <div id="command-input">
          <input id="input-cli" type="text" name="cli" value="url-link-goes-here" readOnly></input>
          <i onClick={this.copy} className="far fa-copy"></i>
        </div>
        <br/>
        <a href="/" className="btn btn-primary w-70 flipped" role="button">View in GitHub</a>
        </div>
      );
    }
  }
}

export default Tile;
