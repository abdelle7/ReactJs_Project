import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AppAside from './AppAside'
import {stitchClient} from './const'
import {RemoteMongoClient} from 'mongodb-stitch-browser-sdk';
import {UserPasswordCredential} from 'mongodb-stitch-browser-sdk';
import {DataBase} from './const';
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const mongodb = stitchClient.getServiceClient(
  RemoteMongoClient.factory,
  "mongodb-atlas"
);
const db=mongodb.db(DataBase);
const collection= db.collection('Utilisateur');
const LoginError = (props) => {
  if (props.display) {
      return (<div style={{color:'red'}} id="results" className="search-results">
      Email ou Mot de passe invalide
    </div>)
  }else return null
};

class SignInForm extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: '',
            display:false,
            isloading:false
        };

        this.handleChangeMe = this.handleChangeMe.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    

    handleChangeMe(e) {
      let target = e.target;
      let value = target.type === 'checkbox' ? target.checked : target.value;
      let name = target.name;

      this.setState({
        [name]: value
      });
  }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({isloading:true});
        this.setState({display:false});
        const credential = new UserPasswordCredential(this.state.email,this.state.password)
        stitchClient.auth.loginWithCredential(credential).then(authedUser => {
          console.log(`successfully logged in with id: ${authedUser.id}`);
          localStorage.setItem('email',this.state.email);
          collection.findOne({ email: this.state.email }).then(function(_user){
              localStorage.setItem('telephone',_user.Telephone);
              localStorage.setItem('societe',_user.Societe);
              localStorage.setItem('nom',_user.nom_prenom);
              localStorage.setItem('email',_user.email);
              window.location = "/dashboard";
          });
        })
.catch(err => {
  console.error(`login failed with error: ${err}+${this.state.email}`);
  this.setState({display:true});
  this.setState({isloading:false});

})
    }

    render() {
        return (
         <div className="w-100 d-inline-flex">
          <AppAside/>
            <div className="App__Form">
            <div className="FormCenter">
            <h1 style={{color:'#000',marginBottom:'40px'}}>CONNEXION</h1>
            
            <LoginError display={this.state.display}/>

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
    touched,
    errors,
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
       />

                {errors.email && touched.email && (
              <div style={{color:'red'}} className="input-feedback">{errors.email}</div>
            )}
              </div>

              <div className="FormField">
                <label className="FormField__Label" htmlFor="password">Mot De Passe</label>
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
       />

                {errors.password && touched.password && (
              <div style={{color:'red'}} className="input-feedback">{errors.password}</div>
            )}
            
              </div>
              <Link to="/MotDePassOublie" className="linkoub">Mot de pass oublié</Link>


              <div className="FormField d-flex">
                  <button style={{fontSize: '18px'}} className="FormField__Button mr-20">Se connecter</button>
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
              <br></br>
              <span style={{fontSize:'17px',color:'black',marginTop:'20px',display:'flex'}}>Vous n'avez pas de compte:&nbsp;<Link to="/"  className="FormField__LinkINS">S'inscrire</Link></span>
 
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
