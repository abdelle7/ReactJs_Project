import React, { Component } from 'react';
import {Route ,Redirect} from "react-router-dom";
import {StitchAuthInfo} from '../pages/const';


class ProtectedRouteLogin extends Component {
    render() {
      const { component: Component, ...props } = this.props;
      const Session=localStorage.getItem(StitchAuthInfo);
        let auth=false;
        if (Session!==null) {
            auth=true;
        }
      return (
        <Route 
          {...props} 
          render={props => (
            auth ?
            <Redirect to='/dashboard' /> :
            <Component {...props} /> 
          )} 
        />
      )
    }
  }
  export default ProtectedRouteLogin;