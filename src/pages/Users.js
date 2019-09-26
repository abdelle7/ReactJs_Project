import React, { Component } from 'react'
import ResponsiveNavigation from '../components/ResponsiveNavigation'
import logo from '../logo.svg';
import EnhancedTable from '../components/EnhancedTable'
import {TextField,Button} from '@material-ui/core/';
import { createMuiTheme, withStyles, makeStyles } from '@material-ui/core/styles';
import { green, purple } from '@material-ui/core/colors';

import SaveIcon from '@material-ui/icons/PersonAdd';
import { black, white } from 'ansi-colors';
import ModalPop from '../components/Modal'
const ColorButton = withStyles(theme => ({
    root: {
      color: '#fff',
      backgroundColor: '#303030',
      '&:hover': {
        backgroundColor: '#000000',
      },
    },
  }))(Button);
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

class Users extends Component {
    render () {
        return (
            <div className="bgcolor w-100 d-inline-flex ">
            <ResponsiveNavigation 
            navLinks={ navLinks }
            logo={ logo }
            background="#000"
            hoverBackground="#2E2E2E"
            linkColor="#ffffff"
            />
            <div className="w-100">
                <div className='d-flex justify-content-between'>
                    <h1 style={{color: 'black', margin: '20px 0 0 20px '}}>Utilisateurs</h1>
            <span className='AddPerson'><ModalPop></ModalPop></span>
                </div>
            
            <div className='mt-5' style={{width: '90%', margin: '0 auto'}}>
            <EnhancedTable></EnhancedTable>
            </div>
            
            </div>

        </div>
        )
    }
}

export default Users