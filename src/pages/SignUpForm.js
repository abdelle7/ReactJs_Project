import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AppAside from './AppAside';

class SignUpForm extends Component {
  
  
    constructor() {
        super();
        this.state = {
            email: '',
            name: '',
            societe:'',
            telephone:'',
            hasAgreed: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);

    }

    handlePageChange() {
      if (this.state.name===''||this.state.email===''||this.state.societe===''||this.state.telephone===''){
        console.log('error');

      }else{
        localStorage.setItem('email', this.state.email);
        localStorage.setItem('nom', this.state.name);
        localStorage.setItem('societe', this.state.societe);
        localStorage.setItem('telephone', this.state.telephone);
        window.location = "/CreatePassword";
        }
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
      if (this.state.name===''||this.state.email===''||this.state.societe===''||this.state.telephone===''){
        console.log('error');

      }else{
        localStorage.setItem('email', this.state.email);
        localStorage.setItem('nom', this.state.name);
        localStorage.setItem('societe', this.state.societe);
        localStorage.setItem('telephone', this.state.telephone);
        window.location = "/CreatePassword";
        }
    }

    render() {
        return (
          <div className="w-100 d-inline-flex">
          <AppAside/>
            <div className="App__Form">
        <div className="FormCenter">
            <h1 style={{color:'#000',marginBottom:'40px'}}>S'INSCRIRE</h1>
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
    .required('Champs obligatoires'),
  nom_prenom: Yup
  .string()
  .required("S'il vous plait entrez votre Nom et Prénom"),
})}
>
{props => {

  return (
            <form onSubmit={this.handleSubmit} className="FormFields">
              <div className="FormField">
                <label className="FormField__Label" htmlFor="name">Nom Prénom</label>
                <input type="text" id="name" className="FormField__Input" placeholder="Entrez votre nom et prenom" name="name" value={this.state.name} onChange={this.handleChange} />
              </div>
              {/*<div className="FormField">
                <label className="FormField__Label" htmlFor="password">Password</label>
                <input type="password" id="password" className="FormField__Input" placeholder="Entrez votre password" name="password" value={this.state.password} onChange={this.handleChange} />
        </div>*/}
              <div className="FormField">
                <label className="FormField__Label" htmlFor="email">E-Mail</label>
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
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <input className="FormField__Checkbox" type="checkbox" name="hasAgreed" value={this.state.hasAgreed} onChange={this.handleChange} /> Accepter les<a href="" className="FormField__TermsLink">conditions d'utilisation</a>
                </label>
              </div>

              <div className="FormField">
              <button className="FormField__ButtonSinup mr-20" style={{fontSize: '18px'}} >S'inscrire</button>
              <Link  to="/sign-in" className="FormField__Link">Je suis déjà membre</Link>
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

export default SignUpForm;
