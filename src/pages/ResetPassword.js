import React, { Component } from 'react';
import AppAside from './AppAside'
import {stitchClient} from './const';

import {UserPasswordAuthProviderClient} from 'mongodb-stitch-browser-sdk';
const url = window.location.search;
const params = new URLSearchParams(url);

const token = params.get('token');
const tokenId = params.get('tokenId');

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

class ResetPassword extends Component {
    constructor() {
        super();

        this.state = {
            password: '',
            passwordconf:''
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

        if (this.state.password===this.state.passwordconf){
          emailPasswordClient.resetPassword(token, tokenId, this.state.password)
          .then(() => {
            console.log("Successfully reset password!");
            window.location = "/sign-in";
        })
          .catch(err => {
            console.log("Error resetting password:", err);
          });
          }else{
            console.log('password not matched');
          }
    }

    render() {
        return (
          <div className="w-100 d-inline-flex">
                      <AppAside/>

          <div className="App__Form">

        <div className="FormCenter">

            <h1 style={{color:'#000',marginBottom:'40px'}}>Créé un mot de passe</h1>

            <form onSubmit={this.handleSubmit} className="FormFields">

           <div className="FormField">
                <label className="FormField__Label" htmlFor="password">Mot de passe</label>
                <input type="password" id="password" className="FormField__Input" placeholder="Entrez votre password" name="password" value={this.state.password} onChange={this.handleChange} />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="passwordconf">Confirmer le Mot de passe</label>
                <input type="password" id="passwordconf" className="FormField__Input" placeholder="Entrez votre password" name="passwordconf" value={this.state.passwordconf} onChange={this.handleChange} />
              </div>

              <div className="FormField">
                  <button style={{fontSize: '18px'}} className="FormField__ButtonSinup mr-20">Définir mot de passe</button>
              </div>
            </form>
          </div>
          </div>
          </div>
        );
    }
}

export default ResetPassword;
