import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppAside from './AppAside'

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

        console.log('The form was submitted with the following data:');
        console.log(this.state);
    }

    render() {
        return (
         <div className="w-100 d-inline-flex">
          <AppAside/>
            <div className="App__Form">
            <div className="FormCenter">
            <h1 style={{color:'#000'}}>CONNEXION</h1>

            <form onSubmit={this.handleSubmit} className="FormFields">

            <div className="FormField">
                <label className="FormField__Label" htmlFor="email">Adresse E-Mail</label>
                <input type="email" id="email" className="FormField__Input" placeholder="Entrez votre email" name="email" value={this.state.email} onChange={this.handleChange} />
              </div>

              <div className="FormField">
                <label className="FormField__Label" htmlFor="password">Password</label>
                <input type="password" id="password" className="FormField__Input" placeholder="Entrez votre password" name="password" value={this.state.password} onChange={this.handleChange} />

              </div>
              <Link to="/sign-in" className="linkoub">Mot de pass oublié</Link>


              <div className="FormField">
                  <button className="FormField__Button mr-20"><Link style={{fontSize:'18px'}} to="/dashboard" className="FormField__LinkDiable" >Se connecter</Link></button> <Link to="/" className="FormField__Link">Créer un compte</Link>
              </div>
            </form>
            </div>
          </div>
        </div> 
        );
    }
}

export default SignInForm;
