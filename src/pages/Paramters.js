import React, { Component } from "react";

const email = localStorage.getItem("email");

class Paramters extends Component {
  constructor() {
    super();

    if (email === null) {
      window.location = "/";
    }
  }
  render() {
    return (
      <div className="w-100 d-inline-flex">
        <div style={{ color: "black" }}>Parametres</div>
      </div>
    );
  }
}

export default Paramters;
