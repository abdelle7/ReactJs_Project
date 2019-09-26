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
        path: '/platforms',
        icon: 'ion-ios-megaphone'
    },
    {
        text: 'Test',
        path: '/test',
        icon: 'ion-ios-business'
    },
    {
        text: 'Parameters',
        path: '/parameters',
        icon: 'ion-ios-business'
    },
    
]
class Test extends Component {
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
            <div style={{color:'black'}}>Test</div>
        </div>
        )
    }
}

export default Test