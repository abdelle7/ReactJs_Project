import React, { Component } from 'react';
import AppAside from './AppAside'
import {RemoteMongoClient} from 'mongodb-stitch-browser-sdk';

import {stitchClient} from './const';

import {UserPasswordAuthProviderClient} from 'mongodb-stitch-browser-sdk';
const emailPasswordClient = stitchClient.auth
  .getProviderClient(UserPasswordAuthProviderClient.factory);
  const url = window.location.search;
  const params = new URLSearchParams(url);
  const token = params.get('token');
  const tokenId = params.get('tokenId');
  const nom = localStorage.getItem('nom');
  const societe = localStorage.getItem('societe');
  const telephone = localStorage.getItem('telephone');
  const email = localStorage.getItem('email');
  const mongodb = stitchClient.getServiceClient(
    RemoteMongoClient.factory,
    "mongodb-atlas"
  );  
class EmailConfirmation extends Component {
  


    componentDidMount(){
        
        emailPasswordClient
        .confirmUser(token, tokenId)
        .then(() => {
            localStorage.setItem('token',token);
            localStorage.setItem('tokenId',tokenId);
            window.setTimeout(function() {
                window.location='/sign-in'
                            }, 3000);
        })
        .catch(err => {

        })
    }

    render() {
        return (
          <div className="w-100 d-inline-flex">
                      <AppAside/>

          <div className="App__Form">


            <h1 style={{fontSize:'40px',color:'#000',marginBottom:'40px'}}>Confirmation Email</h1>
            <div style={{textAlign:'center',fontSize:'30px',color:'black',margin: '0 auto',width:'650px',marginTop:'200px'}}>vous serez redirigé vers la page de connexion en 3 secondes</div>


            
          </div>
          </div>
        );
    }
}

export default EmailConfirmation;
