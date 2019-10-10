import React, { Component } from "react";
import EnhancedTable from "../components/EnhancedTable";
import ModalPop from "../components/Modal";
import { connect } from "react-redux";
import { DataBase } from "../pages/const";
import { StitchAuthInfo } from "../pages/const";
import { stitchClient } from "../pages/const";
import { RemoteMongoClient } from "mongodb-stitch-browser-sdk";

const email = localStorage.getItem("email");
const mongodb = stitchClient.getServiceClient(
  RemoteMongoClient.factory,
  "mongodb-atlas"
);
const db = mongodb.db(DataBase);
const collection = db.collection("Utilisateur");

const fetchDataLocal = () => {
  const Session = localStorage.getItem(StitchAuthInfo);
  if (Session !== null) {
    collection
      .find()
      .toArray()
      .then(items => {
        localStorage.setItem("DataTable", JSON.stringify(items));
        return items;
      })
      .catch(err => console.error(`Failed to find documents: ${err}`));
  }
};

function GetDataLocal() {
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
    //set All Users in LocalStorage
    fetchDataLocal();
  }

  constructor() {
    super();
    if (email === null) {
      window.location = "/";
    }
  }

  render() {
    const rows = GetDataLocal();
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
