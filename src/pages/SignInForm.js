import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AppAside from './AppAside'
import {stitchClient} from './const'
import {RemoteMongoClient} from 'mongodb-stitch-browser-sdk';
import {UserPasswordCredential} from 'mongodb-stitch-browser-sdk';

const nom = localStorage.getItem('nom');
const societe = localStorage.getItem('societe');
const telephone = localStorage.getItem('telephone');
const email = localStorage.getItem('email');
const mongodb = stitchClient.getServiceClient(
  RemoteMongoClient.factory,
  "mongodb-atlas"
);
const db=mongodb.db('EventDash');
const collection= db.collection('Utilisateur');

class SignInForm extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: ''
        };

        this.handleChangeMe = this.handleChangeMe.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    

    handleChangeMe(e) {
      console.log(`successfully logged in with i`);
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
          collection.findOne({ email: this.state.email }).then(function(_user){
            try {
              console.log(`email: ${_user.email}`);
              localStorage.setItem('telephone',_user.Telephone);
              localStorage.setItem('societe',_user.Societe);
              localStorage.setItem('nom',_user.nom_prenom);
              localStorage.setItem('email',_user.email);
              window.location = "/dashboard";

            } catch (error) {
              console.log(`email: Not Found`);
              const user = {
                "nom_prenom": nom,
                "email": email,
                "Societe": societe,
                "Telephone": telephone,
              };
              collection.insertOne(user).then(result => {
              console.log(`Successfully inserted item with _id: ${result.insertedId}`);
              window.location = "/dashboard";
            })
              .catch(err => console.error(`Failed to insert item: ${err}`));
              

            }
          });
          
        })
.catch(err => console.error(`login failed with error: ${err}+${this.state.email}`))
    }

    render() {
        return (
         <div className="w-100 d-inline-flex">
          <AppAside/>
            <div className="App__Form">
            <div className="FormCenter">
            <h1 style={{color:'#000',marginBottom:'40px'}}>CONNEXION</h1>

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
  password: Yup
  .string()
  .required("S'il vous plait entrez votre mot de passe"),
})}
>
{props => {
  const {
    values,
    touched,
    errors,
    dirty,
    handleChange,
    handleBlur,

  } = props;
  return (
    <form onSubmit={this.handleSubmit} className="FormFields">

            <div className="FormField">
                <label className="FormField__Label" htmlFor="email">E-mail</label>
                <input type="email" id="email" className={`FormField__Input ${errors.email && touched.email ? 'text-input error' : 'text-input'}`} placeholder="Entrez votre email" name="email" value={this.state.email} onBlur={handleBlur} onChange={e => {
        // call the built-in handleBur
        handleChange(e)
        // and do something about e
        let target = e.target;
      let value = target.type === 'checkbox' ? target.checked : target.value;
      let name = target.name;
      this.setState({
        [name]: value
      });
    }}
      onBlur={handleBlur} />

                {errors.email && touched.email && (
              <div style={{color:'red'}} className="input-feedback">{errors.email}</div>
            )}
              </div>

              <div className="FormField">
                <label className="FormField__Label" htmlFor="password">passwordl</label>
                <input type="password" id="password" className={`FormField__Input ${errors.password && touched.password ? 'text-input error' : 'text-input'}`} placeholder="Entrez votre Mot de passe" name="password" value={this.state.password} onBlur={handleBlur} onChange={e => {
        // call the built-in handleBur
        handleChange(e)
        // and do something about e
        let target = e.target;
      let value = target.type === 'checkbox' ? target.checked : target.value;
      let name = target.name;
      this.setState({
        [name]: value
      });
    }}
      onBlur={handleBlur} />

                {errors.password && touched.password && (
              <div style={{color:'red'}} className="input-feedback">{errors.password}</div>
            )}
              </div>
              <Link to="/sign-in" className="linkoub">Mot de pass oublié</Link>


              <div className="FormField">
                  <button style={{fontSize: '18px'}} className="FormField__Button mr-20">Se connecter</button>
                   <br></br><span style={{fontSize:'17px',color:'black',marginTop:'20px',display:'flex'}}>Vous n'avez pas de compte:&nbsp;<Link to="/"  className="FormField__LinkINS">S'inscrire</Link></span>
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

export default SignInForm;
