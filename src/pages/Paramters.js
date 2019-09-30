import React, { Component } from 'react'
import ResponsiveNavigation from '../components/ResponsiveNavigation'
import logo from '../logo.svg';
const navLinks = [
    {
        text: 'Dashboard',
        path: '/dashboard',
        icon: 'ion-ios-home'
    },
    {
        text: 'Platforms',
        path: '#',
        icon: 'ion-ios-megaphone'
    },
    {
        text: 'Back office',
        path: '/backoffice',
        icon: 'ion-ios-albums'
    },
    {
        text: 'Parametres',
        path: '#',
        icon: 'ion-ios-business'
    },
    
]

class Paramters extends Component {
    render () {
        return (
            <div className="w-100 d-inline-flex">
            <ResponsiveNavigation 
            navLinks={ navLinks }
            logo={ logo }
            background="#000"
            hoverBackground="#2E2E2E"
            linkColor="#ffffff"
            />
            <div style={{color:'black'}}>Parametres</div>
        </div>
        )
    }
}

export default Paramters