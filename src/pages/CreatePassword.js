import React, { Component } from 'react';
import AppAside from './AppAside'
import { stitchClient } from './const';
import { UserApiKeyCredential, RemoteMongoClient } from 'mongodb-stitch-browser-sdk';
import { UserPasswordAuthProviderClient } from 'mongodb-stitch-browser-sdk';
import { DataBase, ADMIN } from './const';
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const nom = localStorage.getItem('nom');
const email = localStorage.getItem('email');
const societe = localStorage.getItem('societe');
const telephone = localStorage.getItem('telephone');

const mongodb = stitchClient.getServiceClient(
  RemoteMongoClient.factory,
  "mongodb-atlas"
);
const db = mongodb.db(DataBase);
const collection = db.collection('Utilisateur');
const emailPasswordClient = stitchClient.auth
  .getProviderClient(UserPasswordAuthProviderClient.factory);

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
function Authetification(nom, email, societe, telephone) {
  const credential = new UserApiKeyCredential(ADMIN)
  const user = {
    "nom_prenom": nom,
    "email": email,
    "Societe": societe,
    "Telephone": telephone,
  };
  stitchClient.auth.loginWithCredential(credential).then(authedUser => {

    collection.insertOne(user).then(result => {
      localStorage.clear();
      window.location = "/sign-in";
    }).catch(err => console.error(`Failed to insert item: ${err}`));
  })
    .catch(err => {
      console.error(`login failed with error: ${err}`);
      this.setState({ display: true });
    })
}

const EmailConfSend = (props) => {
  if (props.display === 'Succes') {
    return (<div style={{ color: 'green', fontWeight: 'bold', fontSize: '15px' }} id="results" className="search-results">
      Email de confirmation envoyer avec succès
      </div>)
  } else if (props.display === 'NotMatch') {
    return (<div style={{ color: 'red', fontWeight: 'bold', fontSize: '15px' }} id="results" className="search-results">
      Mot de passe et confirmation pas pareil
    </div>)
  } else if (props.display === 'EmailExist') {
    return (<div style={{ color: 'red', fontWeight: 'bold', fontSize: '15px' }} id="results" className="search-results">
      Email déjà utilisé
    </div>)
  } else return null
};

class CreatePassword extends Component {
  constructor() {
    super();

    this.state = {
      password: '',
      passwordconf: '',
      display: 'nothing',
      isloading: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ isloading: true });
    this.setState({ display: "nothing" });
    if (this.state.password === this.state.passwordconf) {
      emailPasswordClient.registerWithEmail(email, this.state.password)
        .then(() => {
          Authetification(nom, email, societe, telephone);
          console.log("Successfully sent account confirmation email!" + email);
          this.setState({ display: "Succes" });
          this.setState({ isloading: false });
          // window.setTimeout(function() {
          //   window.location='/sign-in'
          //               }, 2000);
        })
        .catch(err => {
          if (err.message === 'name already in use') {
            this.setState({ display: "EmailExist" });
            this.setState({ isloading: false });
          }
          console.log("Error registering new user:", err.message);
        });
    } else {
      this.setState({ display: "NotMatch" });
      this.setState({ isloading: false });
      console.log('password not matched');
    }
  }

  render() {
    return (
      <div className="w-100 d-inline-flex">
        <AppAside />

        <div className="App__Form">

          <div className="FormCenter">

            <h1 style={{ color: '#000', marginBottom: '40px' }}>Créé un mot de passe</h1>
            <EmailConfSend display={this.state.display} />

            <form onSubmit={this.handleSubmit} className="FormFields">

              <div className="FormField">
                <label className="FormField__Label" htmlFor="password">Mot de passe</label>
                <input type="password" id="password" className="FormField__Input" placeholder="Entrez votre password" name="password" value={this.state.password} onChange={this.handleChange} />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="passwordconf">Confirmer le Mot de passe</label>
                <input type="password" id="passwordconf" className="FormField__Input" placeholder="Entrez votre password" name="passwordconf" value={this.state.passwordconf} onChange={this.handleChange} />
              </div>

              <div className="FormField d-flex">
                <button style={{ fontSize: '18px' }} className="FormField__ButtonSinup mr-20">Définir mot de passe</button>
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
          </div>
        </div>
      </div>
    );
  }
}

export default CreatePassword;
