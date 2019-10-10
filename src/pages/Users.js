import React, { Component } from "react";
import EnhancedTable from "../components/EnhancedTable";
import ModalPop from "../components/Modal";
import { connect } from "react-redux";

const email = localStorage.getItem("email");
function TestLocal() {
  if (JSON.parse(localStorage.getItem("DataTable")) === null) {
    const rows1 = [];
    return rows1;
  } else {
    const rows1 = JSON.parse(localStorage.getItem("DataTable"));
    return rows1;
  }
}
class Users extends Component {
  componentDidMount() {
    this.props.dispatch({ type: "GET_ALL_DATA" });
  }
  constructor() {
    super();
    if (email === null) {
      window.location = "/";
    }
  }
  render() {
    const rows = TestLocal();
    //const rows = this.props.AllUsers;
    return (
      <div className="bgcolor w-100 d-inline-flex ">
        <div
          className="w-100"
          style={{ height: "fit-content", marginLeft: "300px" }}
        >
          <div className="d-flex justify-content-between">
            <h1 style={{ color: "black", margin: "20px 0 0 20px " }}>
              Utilisateurs
            </h1>
            <span className="AddPerson">
              <ModalPop></ModalPop>
            </span>
          </div>

          <div className="mt-5" style={{ width: "90%", margin: "0 auto" }}>
            <EnhancedTable rows={rows}></EnhancedTable>
          </div>
        </div>
      </div>
    );
  }
}

const mapStatToPropd = state => {
  console.log("Users Data", state.AllUsers);
  return { AllUsers: state.AllUsers };
};
export default connect(mapStatToPropd)(Users);
