import React, { Component } from "react";
import CardChart from "../components/CardChart";
import MainChart from "../components/MainChart";
//const email=localStorage.getItem('email');

class Dashboard extends Component {
  render() {
    return (
      <div
        className="bgcolor w-100 d-inline-flex "
        style={{ height: "fit-content", marginLeft: "300px" }}
      >
        <div className="w-100">
          <div className="d-flex justify-content-between">
            <h1 style={{ color: "black", margin: "20px 0 0 20px " }}>
              Dashboard
            </h1>
          </div>
          <div style={{ padding: "20px 0 0 20px" }}>
            <CardChart />
          </div>
          <div style={{ padding: "20px 20px 0 20px" }}>
            <MainChart />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
