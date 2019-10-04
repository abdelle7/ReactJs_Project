import React, { Component } from 'react';
import {Route ,Redirect} from "react-router-dom";

class ProtectedRoute extends Component {
    render() {
      const { component: Component, ...props } = this.props;
      const Session=localStorage.getItem('__stitch.client.eventappstitch-yrxdm.auth_info');
        let auth=false;
        if (Session!==null) {
            auth=true;
        }
      return (
        <Route 
          {...props} 
          render={props => (
            auth ?
              <Component {...props} /> :
              <Redirect to='/sign-in' />
          )} 
        />
      )
    }
  }
  export default ProtectedRoute;