import React, { Component } from 'react'

const email=localStorage.getItem('email');

class Backoffice extends Component {
    constructor(){
        super();
        if(email===null){
        window.location = "/";
        }
    }
    render () {
        return (
            <div className="bgcolor w-100 d-inline-flex">

                <div className="w-100">
          <div className='d-flex justify-content-between'>
                    <h1 style={{color: 'black', margin: '20px 0 0 20px '}}>Back office</h1>
                </div>
                
                </div>
            </div>
        )
    }
}

export default Backoffice