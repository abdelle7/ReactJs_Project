import React, { Component } from 'react'
import ResponsiveNavigation from '../components/ResponsiveNavigation'
import CardChart from '../components/CardChart'
import MainChart from '../components/MainChart'
import logo from '../logo.svg';
//const email=localStorage.getItem('email');



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
        icon: 'ion-ios-settings'
    },
    
]
class Dashboard extends Component {




    render () {
        return (
            <div className="bgcolor w-100 d-inline-flex">
                <ResponsiveNavigation 
                navLinks={ navLinks }
				logo={ logo }
				background="#000"
				hoverBackground="#2E2E2E"
				linkColor="#ffffff"
                />
                <div className="w-100">
          <div className='d-flex justify-content-between'>
                    <h1 style={{color: 'black', margin: '20px 0 0 20px '}}>Dashboard</h1>
                </div>
                <div style={{padding:'20px 0 0 20px'}}>
                    <CardChart/>
                    </div>
                <div style={{padding:'20px 20px 0 20px'}}>
                <MainChart/>

                </div>
                
                
                </div>
            </div>
            
        )
    }
}

export default Dashboard