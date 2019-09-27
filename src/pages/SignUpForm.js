import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppAside from './AppAside'
class SignUpForm extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            name: '',
            societe:'',
            telephone:'',
            hasAgreed: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);

    }

    handlePageChange() {
      if (this.state.name===''||this.state.email===''){
        console.log('The form was submitted with the following data:');
      }else{
      window.location = "/CreatePassword";}
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
            <h1 style={{color:'#000',marginBottom:'40px'}}>S'INSCRIRE</h1>
            <form onSubmit={this.handleSubmit} className="FormFields">
              <div className="FormField">
                <label className="FormField__Label" htmlFor="name">Nom et Prenom</label>
                <input type="text" id="name" className="FormField__Input" placeholder="Entrez votre nom et prenom" name="name" value={this.state.name} onChange={this.handleChange} />
              </div>
              {/*<div className="FormField">
                <label className="FormField__Label" htmlFor="password">Password</label>
                <input type="password" id="password" className="FormField__Input" placeholder="Entrez votre password" name="password" value={this.state.password} onChange={this.handleChange} />
        </div>*/}
              <div className="FormField">
                <label className="FormField__Label" htmlFor="email">Adresse E-Mail</label>
                <input type="email" id="email" className="FormField__Input" placeholder="Entrez votre email" name="email" value={this.state.email} onChange={this.handleChange} />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="sosiete">Société</label>
                <input type="text" id="societe" className="FormField__Input" placeholder="Entrez votre Société" name="societe" value={this.state.societe} onChange={this.handleChange} />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="telephone">Telephone</label>
                <input type="number" id="telephone" className="FormField__Input" placeholder="Entrez votre Telephone" name="telephone" value={this.state.telephone} onChange={this.handleChange} />
              </div>

              <div className="FormField">
                <label className="FormField__CheckboxLabel">
                    <input className="FormField__Checkbox" type="checkbox" name="hasAgreed" value={this.state.hasAgreed} onChange={this.handleChange} /> Accepter les<a href="" className="FormField__TermsLink">conditions d'utilisation</a>
                </label>
              </div>

              <div className="FormField">
              <button onClick={this.handlePageChange} style={{backgroundColor:'#C59917'}} className="FormField__Button mr-20"><Link style={{fontSize:'18px'}} to="/CreatePassword" className="FormField__LinkDiable" >S'inscrire</Link></button>
              <Link  to="/sign-in" className="FormField__Link">Je suis déjà membre</Link>
              </div>
            </form>
          </div>
          </div>
          </div>
        );
    }
}

export default SignUpForm;
