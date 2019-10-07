import React, { Component } from 'react'
import EnhancedTable from '../components/EnhancedTable'
import ModalPop from '../components/Modal'

const email=localStorage.getItem('email');


class Users extends Component {
componentDidMount(){
    
    if(!window.location.hash) {
        window.location = window.location + '#load';
        window.location.reload();
    }
}
    constructor(){
        super();
        if(email===null){
        window.location = "/";
        }
    }
    render () {
        return (
            <div className="bgcolor w-100 d-inline-flex ">
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