import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignUpForm from './pages/SignUpForm';
import SignInForm from './pages/SignInForm';
import CreatePassword from './pages/CreatePassword'
import Paramters from "./pages/Paramters"
import Dashboard from './pages/Dashboard'
import Platforms from './pages/Platforms'
import DelailsCompte from './pages/DetailsCompte'
import Users from './pages/Users';
import Test from './pages/Test';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          
            {/*<div className="PageSwitcher">
                <NavLink to="/sign-in" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Se connecter</NavLink>
                <NavLink exact to="/" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">S'inscrire</NavLink>
    </div>*/}<Switch>
              <Route exact path="/" component={SignUpForm}>
              </Route>
              <Route  path="/sign-in" component={SignInForm}>
              </Route>
              <Route  path="/CreatePassword" component={CreatePassword}></Route>
              <Route  path="/parameters" component={Paramters}>
              </Route>
              <Route path="/details" component={DelailsCompte} />
              <Route path="/users" component={Users} />
              <Route  path="/dashboard" component={Dashboard}></Route>
              <Route  path="/platforms" component={Platforms}></Route>
              <Route  path="/test" component={Test}></Route>
              </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;