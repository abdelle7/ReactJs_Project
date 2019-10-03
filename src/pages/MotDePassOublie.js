import React, { Component } from 'react';
import AppAside from './AppAside'
import {stitchClient} from './const';

import {UserPasswordAuthProviderClient} from 'mongodb-stitch-browser-sdk';

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

class MotDePassOublie extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
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


          emailPasswordClient.sendResetPasswordEmail(this.state.email)
          .then(() => {
            console.log("Successfully sent password reset email!",this.state.email);
            window.location = "/sign-in";
        })
          .catch(err => {
            console.log("Error sending password reset email", err);
          });

    }

    render() {
        return (
          <div className="w-100 d-inline-flex">
                      <AppAside/>

          <div className="App__Form">

        <div className="FormCenter">

            <h1 style={{color:'#000',marginBottom:'40px'}}>Réinitialiser le mot de passe</h1>

            <form onSubmit={this.handleSubmit} className="FormFields">

           <div className="FormField">
                <label className="FormField__Label" htmlFor="email">E-Mail</label>
                <input type="email" id="email" className="FormField__Input" placeholder="Entrez votre email" name="email" value={this.state.email} onChange={this.handleChange} />
              </div>

              <div className="FormField">
                  <button style={{fontSize: '18px'}} className="FormField__ButtonSinup mr-20">Envoyer un email</button>
              </div>
            </form>
          </div>
          </div>
          </div>
        );
    }
}

export default MotDePassOublie;
