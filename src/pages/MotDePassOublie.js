import React, { Component } from "react";
import AppAside from "./AppAside";
import { Formik } from "formik";
import * as Yup from "yup";
import { stitchClient } from "./const";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { UserPasswordAuthProviderClient } from "mongodb-stitch-browser-sdk";

const SendReset = props => {
  if (props.display) {
    return (
      <div
        style={{ color: "red", fontWeight: "bold", fontSize: "15px" }}
        id="results"
        className="search-results"
      >
        Email introuvable
      </div>
    );
  } else if (props.sent) {
    return (
      <div
        style={{ color: "green", fontWeight: "bold", fontSize: "15px" }}
        id="results"
        className="search-results"
      >
        Email de réinitialisation envoyé avec succès
      </div>
    );
  } else return null;
};

const emailPasswordClient = stitchClient.auth.getProviderClient(
  UserPasswordAuthProviderClient.factory
);

// const userForm={
//   "aud": "eventdash-rezoi",
//   "exp": 1516239022,
//   "sub": "24601",
//   "_user": {
//     "nom_prenom": nom,
//     "telephon": telephone,
//     "email": email,
//     "societe": societe,
//   }
// }

class MotDePassOublie extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      isloading: false,
      display: false,
      sent: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ isloading: true });
    this.setState({ display: false });
    emailPasswordClient
      .sendResetPasswordEmail(this.state.email)
      .then(() => {
        this.setState({ isloading: false });
        this.setState({ sent: true });
        console.log(
          "Successfully sent password reset email!",
          this.state.email
        );
        window.setTimeout(function() {
          window.location = "/sign-in";
        }, 2000);
      })
      .catch(err => {
        if (err.errorCode === 44) {
          this.setState({ display: true });
        }
        this.setState({ isloading: false });
        console.log("Error sending password reset email", err);
      });
  }

  render() {
    return (
      <div className="w-100 d-inline-flex">
        <AppAside />

        <div className="App__Form">
          <div className="FormCenter">
            <h1 style={{ color: "#000", marginBottom: "40px" }}>
              Réinitialiser le mot de passe
            </h1>
            <SendReset sent={this.state.sent} display={this.state.display} />
            <Formik
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                  setSubmitting(false);
                }, 500);
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .email("L'Email doit être valide")
                  .required("Champs obligatoires")
              })}
            >
              {props => {
                const { touched, errors, handleChange, handleBlur } = props;
                return (
                  <form onSubmit={this.handleSubmit} className="FormFields">
                    <div className="FormField">
                      <label className="FormField__Label" htmlFor="email">
                        E-mail
                      </label>
                      <input
                        type="email"
                        id="email"
                        className={`FormField__Input ${
                          errors.email && touched.email
                            ? "text-input error"
                            : "text-input"
                        }`}
                        placeholder="Entrez votre email"
                        name="email"
                        value={this.state.email}
                        onBlur={handleBlur}
                        onChange={e => {
                          // call the built-in handleBur
                          handleChange(e);
                          // and do something about e
                          let target = e.target;
                          let value =
                            target.type === "checkbox"
                              ? target.checked
                              : target.value;
                          let name = target.name;
                          this.setState({
                            [name]: value
                          });
                        }}
                      />
                      {errors.email && touched.email && (
                        <div
                          style={{ color: "red" }}
                          className="input-feedback"
                        >
                          {errors.email}
                        </div>
                      )}
                    </div>

                    <div className="FormField d-flex">
                      <button
                        style={{ fontSize: "18px" }}
                        className="FormField__ButtonSinup mr-20"
                      >
                        Envoyer un email
                      </button>
                      <span>
                        <Loader
                          type="Puff"
                          color="#00BFFF"
                          visible={this.state.isloading}
                          height={60}
                          width={60}
                        />
                      </span>
                    </div>
                  </form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    );
  }
}

export default MotDePassOublie;
