import React, { Component } from 'react'
import ResponsiveNavigation from '../components/ResponsiveNavigation'
import logo from '../logo.svg';
import DataTableFilter from '../components/DataTableFilter';


const email=localStorage.getItem('email');



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
class DataTable extends Component {
    constructor(){
        super();
        if(email===null){
        window.location = "/";
        }
    }



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
                    <h1 style={{color: 'black', margin: '20px 0 0 20px '}}>Données des utilisateurs</h1>
                </div>
                <div className='mt-5' style={{width: '90%', margin: '0 auto'}}>
                <DataTableFilter/>
                </div>
                </div>
            </div>
            
        )
    }
}

export default DataTable