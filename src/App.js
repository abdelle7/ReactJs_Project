import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import SignUpForm from "./pages/SignUpForm";
import SignInForm from "./pages/SignInForm";
import CreatePassword from "./pages/CreatePassword";
import Paramters from "./pages/Paramters";
import Dashboard from "./pages/Dashboard";
import Platforms from "./pages/Platforms";
import DelailsCompte from "./pages/DetailsCompte";
import Users from "./pages/Users";
import Backoffice from "./pages/Backoffice";
import "./App.css";
import history from "./history";
import "bootstrap/dist/css/bootstrap.min.css";
import EmailConfirmation from "./pages/EmailConfirmation";
import DataTable from "./pages/DataTable";
import ProtectedRoutes from "./components/ProtectedRoutes";
import MotDePassOublie from "./pages/MotDePassOublie";
import ResetPassword from "./pages/ResetPassword";
import { StitchAuthInfo } from "./pages/const";
//import ProtectedRouteLogin from './components/ProtectedRouteLogin'
import ResponsiveNavigation from "./components/ResponsiveNavigation";
import logo from "./logo.svg";

const navLinks = [
  {
    text: "Dashboard",
    path: "/dashboard",
    icon: "ion-ios-home"
  },
  {
    text: "Platforms",
    path: "#",
    icon: "ion-ios-megaphone"
  },
  {
    text: "Back office",
    path: "/backoffice",
    icon: "ion-ios-albums"
  },
  {
    text: "Parametres",
    path: "#",
    icon: "ion-ios-settings"
  }
];

const Session = localStorage.getItem(StitchAuthInfo);
let auth = false;
if (Session !== null) {
  auth = true;
}

let navHeader = auth ? (
  <ResponsiveNavigation
    navLinks={navLinks}
    logo={logo}
    background="#000"
    hoverBackground="#2E2E2E"
    linkColor="#ffffff"
  />
) : (
  ""
);
class App extends Component {
  render() {
    return (
      <BrowserRouter history={history}>
        <div className="App">
          {navHeader}
          {/*<div className="PageSwitcher">
                <NavLink to="/sign-in" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Se connecter</NavLink>
                <NavLink exact to="/" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">S'inscrire</NavLink>
    </div>*/}

          <Switch>
            <Route
              exact
              path="/"
              component={() => (auth ? <Dashboard /> : <SignUpForm />)}
            />
            <Route
              path="/sign-in"
              component={() => (auth ? <Dashboard /> : <SignInForm />)}
            />
            <Route
              path="/emailconfirmation"
              component={() => (auth ? <Dashboard /> : <EmailConfirmation />)}
            />
            <Route
              path="/CreatePassword"
              component={() => (auth ? <Dashboard /> : <CreatePassword />)}
            />
            <Route
              path="/MotDePassOublie"
              component={() => (auth ? <Dashboard /> : <MotDePassOublie />)}
            />
            <Route
              path="/ResetPassword"
              component={() => (auth ? <Dashboard /> : <ResetPassword />)}
            />

            {/* <ProtectedRouteLogin  path="/" component={SignUpForm} />
              <ProtectedRouteLogin  path="/sign-in" component={SignInForm} />
              <ProtectedRouteLogin  path='/emailconfirmation' component={EmailConfirmation} />
              <ProtectedRouteLogin  path="/CreatePassword" component={CreatePassword} /> */}

            <ProtectedRoutes path="/dashboard" component={Dashboard} />
            <ProtectedRoutes path="/parameters" component={Paramters} />
            <ProtectedRoutes path="/details" component={DelailsCompte} />
            <ProtectedRoutes path="/users" component={Users} />
            <ProtectedRoutes path="/platforms" component={Platforms} />
            <ProtectedRoutes path="/backoffice" component={Backoffice} />
            <ProtectedRoutes path="/datatable" component={DataTable} />

            <Route render={() => <Redirect to={{ pathname: "/sign-in" }} />} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
