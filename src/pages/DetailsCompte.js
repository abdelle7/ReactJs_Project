import React, { Component } from 'react'
import PropTypes from "prop-types";
import ResponsiveNavigation from '../components/ResponsiveNavigation'
import logo from '../logo.svg';
import 'semantic-ui-css/semantic.min.css'
import {TextField,Button} from '@material-ui/core/';
import SaveIcon from '@material-ui/icons/Save';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import {
    
    Checkbox,
    Grid,
    Header,
    Icon,
    Image,
    Menu,
    Segment,
    Sidebar
  } from "semantic-ui-react";



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
        text: 'Parameters',
        path: '#',
        icon: 'ion-ios-business'
    },
    
]

const HorizontalSidebar = ({ animation, direction, visible }) => (
    <Sidebar
      as={Segment}
      animation={animation}
      direction={direction}
      visible={visible}
      className=''
    >           <h2 style={{color:'black'}} className='float-left'>Detail Du Compte</h2>
    <span className='d-flex justify-content-end'>
        <Button  variant="outlined" onClick={Sidebar.visible=false}  >
                  Cancel
              </Button>
              <Button style={{backgroundColor: '#000', color: '#fff'}} variant="outlined" color="default" size="small" className='ml-2'>
        <SaveIcon className='mr-2' />
        Save
            </Button>
    </span>
              
    </Sidebar>
  );
  
  HorizontalSidebar.propTypes = {
    animation: PropTypes.string,
    direction: PropTypes.string,
    visible: PropTypes.bool
  };

class DetailsCompte extends Component {
    
    state = {
    animation: "push",
    direction: "top",
    dimmed: false,
    visible: false
  };

  handleAnimationChange = animation => () =>
    this.setState(prevState => ({ animation, visible: !prevState.visible }));

  handleDimmedChange = (e, { checked }) => this.setState({ dimmed: checked });

  handleDirectionChange = direction => () =>
    this.setState({ direction, visible: false });

    

    constructor(){
        super();
        this.denominationIN=React.createRef();
    }
    render () {
        const { animation, dimmed, direction, visible } = this.state;
    const vertical = direction === "bottom" || direction === "top";
        return (
            <div className=" bgcolor w-100 d-inline-flex">
                <ResponsiveNavigation 
                navLinks={ navLinks }
				logo={ logo }
				background="#000"
				hoverBackground="#2E2E2E"
				linkColor="#ffffff"
                />


                <div className="w-100">
                <div>
                <Sidebar.Pushable style={{height:'100px'}}
                dimmed={dimmed && visible}>
          {vertical ? (
            <HorizontalSidebar
              animation={animation}
              direction={direction}
              visible={visible}
            />
          ) : null}
          <div className='d-flex justify-content-between'>
                    <h1 style={{color: 'black', margin: '20px 0 0 20px '}}>Detail Du Compte</h1>
                </div>

        </Sidebar.Pushable>
                </div>
                
                <div className='detailsContainer'>
                
                    <form className='FormCN'>
                    <MDBContainer className='MDBContainer' >
      <MDBRow className='rowCont '>
        <MDBCol  className=' pt-3 d-flex align-items-center'><label className='labelCN'>Dénomination</label>
        </MDBCol>
        <MDBCol className='align-items-center ml-5'><span >
                            <TextField
                            style={{width: '300px',}}
                            id="outlined-bare"
                            ref={this.denominationIN}
                            defaultValue="Dénomination"
                            margin="dense"
                            variant="outlined"
                            inputProps={{ 'aria-label': 'bare' }}
                        />
                        </span></MDBCol>
                        <MDBCol className='d-flex align-items-center'>
                        <i className='ion-md-create' style={{cursor: 'pointer'}} onClick={this.handleAnimationChange("push")} />
                        </MDBCol>
      </MDBRow>
      <MDBRow className='midRow'>
        <MDBCol className='pt-3 d-flex align-items-center'><label className='labelCN'>Contact</label>
        </MDBCol>
        <MDBCol className='align-items-center ml-5'><span >
                            <TextField
                            style={{width: '300px'}}
                            id="outlined-bare"
                            defaultValue="Contact"
                            margin="dense"
                            variant="outlined"
                            inputProps={{ 'aria-label': 'bare' }}
                        />
                        </span></MDBCol>
                        <MDBCol className='d-flex align-items-center'>
                        <i className='ion-md-create' />
                        </MDBCol>
      </MDBRow>
      <MDBRow className='midRow'>
        <MDBCol className=' pt-3 d-flex align-items-center'><label className='labelCN'>Lorem</label>
        </MDBCol>
        <MDBCol className='align-items-center ml-5'><span >
                            <TextField
                            style={{width: '300px'}}
                            id="outlined-bare"
                            defaultValue="Lorem"
                            margin="dense"
                            variant="outlined"
                            inputProps={{ 'aria-label': 'bare' }}
                        />
                        </span></MDBCol>
                        <MDBCol className='d-flex align-items-center'>
                        <i className='ion-md-create' />
                        </MDBCol>
      </MDBRow>
      <MDBRow className='lastRow'>
        <MDBCol className=' pt-3 d-flex align-items-center'><label className='labelCN'>Site WEB</label>
        </MDBCol>
        <MDBCol className='align-items-center ml-5'><span >
                            <TextField
                            style={{width: '300px'}}
                            id="outlined-bare"
                            defaultValue="Site WEB"
                            margin="dense"
                            variant="outlined"
                            inputProps={{ 'aria-label': 'bare' }}
                        />
                        </span></MDBCol>
                        <MDBCol className='d-flex align-items-center'>
                        <i className='ion-md-create' />
                        </MDBCol>
      </MDBRow>
    </MDBContainer>
                     </form>
                    <span className='SpanLibel'></span>
                    
                </div>


                
                
                
                </div>
                </div>
            
        )
    }
}

export default DetailsCompte