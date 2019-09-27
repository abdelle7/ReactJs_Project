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
      animation='push'
      direction='top'
      visible={visible}
      className=''
    >           <h2 style={{color:'black'}} className='float-left'>Detail Du Compte</h2>
    <span className='d-flex justify-content-end'>
        <Button  variant="outlined"  >
                  Cancel
              </Button>
              <Button style={{backgroundColor: '#000', color: '#fff'}} variant="outlined" color="default" size="small" className='ml-2'>
        <SaveIcon className='mr-2' />
        Save
            </Button>
    </span>
              
    </Sidebar>
  );
  

class DetailsCompte extends Component {

  constructor(props) {
    super(props);
    // create a ref to store the textInput DOM element
    this.refDeno = React.createRef();
    this.refContact = React.createRef();
    this.refTest = React.createRef();
    this.refSite = React.createRef();

    this.focus = this.focus.bind(this);
    
  }
  focus = num => () =>{
    var animation='push';
    switch (num) {
      case 1:
        this.refDeno.current.focus();
        break;
      case 2:
          this.refContact.current.focus();
        break;
      case 3:
            this.refTest.current.focus();
        break;
      case 4:
              this.refSite.current.focus();
        break;
    
      default:
        break;
    }
    if (!this.state.visible) {
      this.setState(prevState => ({ animation, visible: !prevState.visible }));
    }
  }

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
                <Sidebar.Pushable style={{height:'100px'}}>
                  <Sidebar
                    as={Segment}
                    animation='push'
                    direction='top'
                    visible={visible}>
                    <h2 style={{color:'black'}} className='float-left'>Detail Du Compte</h2>
                  <span className='d-flex justify-content-end'>
                      <Button  variant="outlined" onClick={this.handleAnimationChange('push')}  >
                                Cancel
                            </Button>
                            <Button style={{backgroundColor: '#000', color: '#fff'}} variant="outlined" color="default" size="small" className='ml-2'>
                      <SaveIcon className='mr-2' />
                      Save
                          </Button>
                  </span>
              
                  </Sidebar>
                        
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
                            <input
                            className='mt-2'
                            style={{width: '300px',height:'37px',border:'0'}}
                            id="outlined-bare"
                            ref={this.refDeno}
                            defaultValue="Dénomination"
                            margin="dense"
                            variant="outlined"
                            inputProps={{ 'aria-label': 'bare' }}
                        />
                        </span></MDBCol>
                        <MDBCol className='d-flex align-items-center'>
                        <i className='ion-md-create' style={{cursor: 'pointer'}} onClick={this.focus(1)} />
                        </MDBCol>
      </MDBRow>
      <MDBRow className='midRow'>
        <MDBCol className='pt-3 d-flex align-items-center'><label className='labelCN'>Contact</label>
        </MDBCol>
        <MDBCol className='align-items-center ml-5'><span >
                            <input
                            className='mt-2'
                            style={{width: '300px',height:'37px',border:'0'}}
                            id="outlined-bare"
                            ref={this.refContact}
                            defaultValue="Contact"
                            margin="dense"
                            variant="outlined"
                            inputProps={{ 'aria-label': 'bare' }}
                        />
                        </span></MDBCol>
                        <MDBCol className='d-flex align-items-center'>
                        <i className='ion-md-create' style={{cursor: 'pointer'}} onClick={this.focus(2)} />
                        </MDBCol>
      </MDBRow>
      <MDBRow className='midRow'>
        <MDBCol className=' pt-3 d-flex align-items-center'><label className='labelCN'>Lorem</label>
        </MDBCol>
        <MDBCol className='align-items-center ml-5'><span >
                          <input
                            className='mt-2'
                            style={{width: '300px',height:'37px',border:'0'}}
                            id="outlined-bare"
                            ref={this.refTest}
                            defaultValue="Lorem"
                            margin="dense"
                            variant="outlined"
                            inputProps={{ 'aria-label': 'bare' }}
                        />
                        </span></MDBCol>
                        <MDBCol className='d-flex align-items-center'>
                        <i className='ion-md-create' style={{cursor: 'pointer'}} onClick={this.focus(3)} />
                        </MDBCol>
      </MDBRow>
      <MDBRow className='lastRow'>
        <MDBCol className=' pt-3 d-flex align-items-center'><label className='labelCN'>Site WEB</label>
        </MDBCol>
        <MDBCol className='align-items-center ml-5'><span >
                          <input
                            className='mt-2'
                            style={{width: '300px',height:'37px',border:'0'}}
                            id="outlined-bare"
                            ref={this.refSite}
                            defaultValue="Site WEB"
                            margin="dense"
                            variant="outlined"
                            inputProps={{ 'aria-label': 'bare' }}
                        />
                        </span></MDBCol>
                        <MDBCol className='d-flex align-items-center'>
                        <i className='ion-md-create' style={{cursor: 'pointer'}} onClick={this.focus(4)} />
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