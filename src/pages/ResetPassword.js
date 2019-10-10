import React, { Component } from "react";
import AppAside from "./AppAside";
import { Formik } from "formik";
import * as Yup from "yup";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { stitchClient } from "./const";
import { UserPasswordAuthProviderClient } from "mongodb-stitch-browser-sdk";

const ResetInfo = props => {
  if (props.display) {
    return (
      <div
        style={{ color: "red", fontWeight: "bold", fontSize: "15px" }}
        id="results"
        className="search-results"
      >
        Mot de passe et confirmation pas pareil
      </div>
    );
  } else if (props.sent) {
    return (
      <div
        style={{ color: "green", fontWeight: "bold", fontSize: "15px" }}
        id="results"
        className="search-results"
      >
        Mot De Passe réinitialisater avec succès
      </div>
    );
  } else return null;
};
const url = window.location.search;
const params = new URLSearchParams(url);

const token = params.get("token");
const tokenId = params.get("tokenId");

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

class ResetPassword extends Component {
  constructor() {
    super();

    this.state = {
      password: "",
      passwordconf: "",
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
    this.setState({ sent: false });

    if (this.state.password === this.state.passwordconf) {
      emailPasswordClient
        .resetPassword(token, tokenId, this.state.password)
        .then(() => {
          this.setState({ isloading: false });
          this.setState({ sent: true });
          console.log("Successfully reset password!");
          window.setTimeout(function() {
            window.location = "/sign-in";
          }, 2000);
        })
        .catch(err => {
          this.setState({ isloading: false });
          // this.setState({display:true});
          console.log("Error resetting password:", err);
        });
    } else {
      this.setState({ isloading: false });
      this.setState({ display: true });
      console.log("password not matched");
    }
  }

  render() {
    return (
      <div className="w-100 d-inline-flex">
        <AppAside />

        <div className="App__Form">
          <div className="FormCenter">
            <h1 style={{ color: "#000", marginBottom: "40px" }}>
              Créé un mot de passe
            </h1>
            <ResetInfo sent={this.state.sent} display={this.state.display} />
            <Formik
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  this.setState({ isloading: true });
                  this.setState({ display: false });
                  this.setState({ sent: false });

                  if (values.password === values.passwordconf) {
                    emailPasswordClient
                      .resetPassword(token, tokenId, values.password)
                      .then(() => {
                        this.setState({ isloading: false });
                        this.setState({ sent: true });
                        console.log("Successfully reset password!");
                        window.setTimeout(function() {
                          window.location = "/sign-in";
                        }, 2000);
                      })
                      .catch(err => {
                        this.setState({ isloading: false });
                        // this.setState({display:true});
                        console.log("Error resetting password:", err);
                      });
                  } else {
                    this.setState({ isloading: false });
                    this.setState({ display: true });
                    console.log("password not matched");
                  }
                  setSubmitting(false);
                }, 500);
              }}
              validationSchema={Yup.object().shape({
                password: Yup.string()
                  .required("S'il vous plait entrez votre mot de passe")
                  .min(
                    6,
                    "Le mot de passe est trop court - au moins 6 caractères."
                  )
                  .matches(
                    /[a-zA-Z]/,
                    "Le mot de passe doit contenir des lettres."
                  ),
                passwordconf: Yup.string()
                  .required("S'il vous plait Confirmez votre mot de passe")
                  .min(
                    6,
                    "Le mot de passe est trop court - au moins 6 caractères."
                  )
                  .matches(
                    /[a-zA-Z]/,
                    "Le mot de passe doit contenir des lettres."
                  )
              })}
            >
              {props => {
                const {
                  touched,
                  values,
                  errors,
                  handleChange,
                  handleBlur,
                  handleSubmit
                } = props;
                return (
                  <form onSubmit={handleSubmit} className="FormFields">
                    <div className="FormField">
                      <label className="FormField__Label" htmlFor="password">
                        Mot de passe
                      </label>
                      <input
                        type="password"
                        id="password"
                        className={`FormField__Input ${
                          errors.password && touched.password
                            ? "text-input error"
                            : "text-input"
                        }`}
                        placeholder="Entrez votre password"
                        name="password"
                        value={values.password}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />

                      {errors.password && touched.password && (
                        <div
                          style={{ color: "red" }}
                          className="input-feedback"
                        >
                          {errors.password}
                        </div>
                      )}
                    </div>
                    <div className="FormField">
                      <label
                        className="FormField__Label"
                        htmlFor="passwordconf"
                      >
                        Confirmer le Mot de passe
                      </label>
                      <input
                        type="password"
                        id="passwordconf"
                        className={`FormField__Input ${
                          errors.passwordconf && touched.passwordconf
                            ? "text-input error"
                            : "text-input"
                        }`}
                        placeholder="Confirmez votre password"
                        name="passwordconf"
                        value={values.passwordconf}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />

                      {errors.passwordconf && touched.passwordconf && (
                        <div
                          style={{ color: "red" }}
                          className="input-feedback"
                        >
                          {errors.passwordconf}
                        </div>
                      )}
                    </div>

                    <div className="FormField d-flex">
                      <button
                        style={{ fontSize: "18px" }}
                        className="FormField__ButtonSinup mr-20"
                      >
                        Définir mot de passe
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

export default ResetPassword;
