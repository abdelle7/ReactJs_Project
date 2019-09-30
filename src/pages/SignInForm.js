import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppAside from './AppAside'
import {stitchClient} from './const'
import {Stitch,UserPasswordAuthProviderClient,UserPasswordCredential} from 'mongodb-stitch-browser-sdk';

const app=Stitch.defaultAppClient;

class SignInForm extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: ''
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
        const credential = new UserPasswordCredential(this.state.email,this.state.password)
        stitchClient.auth.loginWithCredential(credential).then(authedUser => {
          console.log(`successfully logged in with id: ${authedUser.id}`);
          localStorage.setItem('email',this.state.email);
          window.location = "/dashboard";
        })
.catch(err => console.error(`login failed with error: ${err}`))
    }

    render() {
        return (
         <div className="w-100 d-inline-flex">
          <AppAside/>
            <div className="App__Form">
            <div className="FormCenter">
            <h1 style={{color:'#000',marginBottom:'40px'}}>CONNEXION</h1>

            <form onSubmit={this.handleSubmit} className="FormFields">

            <div className="FormField">
                <label className="FormField__Label" htmlFor="email">E-mail</label>
                <input type="email" id="email" className="FormField__Input" placeholder="Entrez votre email" name="email" value={this.state.email} onChange={this.handleChange} />
              </div>

              <div className="FormField">
                <label className="FormField__Label" htmlFor="password">Password</label>
                <input type="password" id="password" className="FormField__Input" placeholder="Entrez votre password" name="password" value={this.state.password} onChange={this.handleChange} />

              </div>
              <Link to="/sign-in" className="linkoub">Mot de pass oublié</Link>


              <div className="FormField">
                  <button style={{fontSize: '18px'}} className="FormField__Button mr-20">Se connecter</button>
                   <br></br><span style={{fontSize:'17px',color:'black',marginTop:'20px',display:'flex'}}>Vous n'avez pas de compte:&nbsp;<Link to="/"  className="FormField__LinkINS">S'inscrire</Link></span>
              </div>
            </form>
            </div>
          </div>
        </div> 
        );
    }
}

export default SignInForm;
