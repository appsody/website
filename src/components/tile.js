import React from "react";
import Moment from "moment";

class Tile extends React.Component {
  constructor(props) {
    super(props);
    let maxLength = 70;
    if(this.props.desc.length > maxLength) {
      let trimmedDesc = this.props.desc.substr(0, maxLength);
      this.desc = this.props.desc.substr(0, Math.min(trimmedDesc.length, trimmedDesc.lastIndexOf(" "))) + "..."
    } else {
      this.desc = this.props.desc;
    }

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
        <div className="tile card text-center">
          
          <h5 className="heading-tile">{this.props.heading}</h5>
          { this.props.deprecated && <img title={this.props.deprecated} className="deprecated-icon" src={require("../images/deprecation_warning.svg") } width="30px"/>}

          <p>{this.desc}</p>

          <a href="/" onClick={this.handleClick} className="btn btn-primary w-50 mx-auto" role="button">Select</a>
          { this.props.updated && <p className="updated-date">Updated: {Moment.unix(this.props.updated / 1000).format('MMM Do')}</p>}
        </div>
      );
    } else {
       return (
          <div id={this.props.id} className="tile card flip">
            <i onClick={this.handleClick} className="fas fa-arrow-left" title="flip card"></i>
            <h5 id="tile-heading" className="heading-tile">{this.props.heading}</h5>
  
            <div id="command-input">
              <input id="input-cli" type="text" name="cli" value={this.props.cmd} readOnly></input>
              <i onClick={this.copy} className="far fa-copy"></i>
            </div>
            <a href={this.props.github} className="btn btn-clear w-75 mx-auto" role="button">View in GitHub</a>
          </div>
        );
      }
  
  }
}

export default Tile;

