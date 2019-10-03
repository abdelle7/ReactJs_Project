import React, { Component } from 'react';
import {Route ,Redirect} from "react-router-dom";

class ProtectedRouteLogin extends Component {
    render() {
      const { component: Component, ...props } = this.props;
      const Session=localStorage.getItem('__stitch.client.eventdash-rezoi.auth_info');
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
              <Redirect to='/dashboard' />
          )} 
        />
      )
    }
  }
  export default ProtectedRouteLogin;