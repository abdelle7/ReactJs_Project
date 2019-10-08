import React, { Component } from 'react'

import DataTableFilter from '../components/DataTableFilter';


const email=localStorage.getItem('email');




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

                <div className="w-100" style={{height:'fit-content' ,marginLeft:'300px'}}>
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