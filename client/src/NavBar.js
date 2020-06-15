import React, { Component } from "react";

import "./App.css";

class NavBar extends Component {
  render() {
    return (
      <div className="NavBar">
          <div>Your Account: {this.props.account}</div>
          <div>Your Balance: {this.props.balance} ETH</div>
          <div>Current Network: {this.props.network}</div>
      </div>
    );
  }

  
}

export default NavBar;
