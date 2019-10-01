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
  import {stitchClient} from './const'
import {RemoteMongoClient} from 'mongodb-stitch-browser-sdk';

const mongodb = stitchClient.getServiceClient(
  RemoteMongoClient.factory,
  "mongodb-atlas"
);
const db=mongodb.db('EventDash');
const collection= db.collection('Utilisateur');
const email=localStorage.getItem('email');
collection.findOne({ email: email }).then(function(_user){
  console.log(`email: ${_user.Denomination}`);


}).catch(err => console.error(`Failed to insert item: ${err}`));

  const query = { "email": email };
  const options = { "upsert": false };


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
    this.state = {
      denomination: '',
      contact: '',
      lorem:'',
      site_web:'',
      user: [{
        denomination:'',
        contact:'',
        lorem:'',
        site_web: '',
      }],
  };
    // create a ref to store the textInput DOM element
    this.refDeno = React.createRef();
    this.refContact = React.createRef();
    this.refTest = React.createRef();
    this.refSite = React.createRef();

    this.display = this.display.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.focus = this.focus.bind(this);
      if(email===null){
      window.location = "/";
      
  }}
  componentDidMount(){
    this.display();
  }

  display(){
    collection.findOne({ email: email }).then(function(_user){
        console.log(`email: ${_user.Denomination}`);
        if(_user.Denomination!==undefined){
        this.setState({_user});}

    }).catch(err => console.error(`Failed to insert item: ${err}`));
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

    handleSubmit(e) {
      e.preventDefault();
console.log('submite');
      const update = {
        "$push": {
          "Denomination":this.state.denomination ,
          "Contact":this.state.contact ,
          "Lorem":this.state.lorem ,
          "Site_WEB":this.state.site_web ,
        }
      };

      collection.updateOne(query, update, options)
      .then(
        //this.display();
        console.log("update")
      )
      .catch(err => console.error(`Failed to add review: ${err}`))
        console.log('Test:',this.state.contact);

    }

    handleChange(e) {
      let target = e.target;
      let value = target.type === 'checkbox' ? target.checked : target.value;
      let name = target.name;

      this.setState({
        [name]: value
      });
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
                <form onSubmit={this.handleSubmit} >
                <div>
                <Sidebar.Pushable style={{height:'100px'}}>
                  <Sidebar
                    as={Segment}
                    animation='push'
                    direction='top'
                    visible={visible}>
                    <h2 style={{color:'black'}} className='float-left'>Detail Du Compte</h2>
                  <span className='d-flex justify-content-end'>
                      <Button   variant="outlined" onClick={this.handleAnimationChange('push')}  >
                                Cancel
                            </Button>
                            <Button type="Submit" style={{backgroundColor: '#000', color: '#fff'}} variant="outlined" color="default" size="small" className='ml-2'>
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
                    <span className='FormCN'>
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
                            name='denomination'
                            Value='denomination'
                            margin="dense"
                            variant="outlined"
                            onChange={this.handleChange}
                            inputprops={{ 'aria-label': 'bare' }}
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
                            name='contact'
                            Value="Contact"
                            margin="dense"
                            variant="outlined"
                            onChange={this.handleChange}
                            inputprops={{ 'aria-label': 'bare' }}
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
                            name='lorem'
                            defaultValue="Lorem"
                            margin="dense"
                            variant="outlined"
                            onChange={this.handleChange}
                            inputprops={{ 'aria-label': 'bare' }}
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
                            name='site_web'
                            Value="Site WEB"
                            margin="dense"
                            onChange={this.handleChange}
                            variant="outlined"
                            inputprops={{ 'aria-label': 'bare' }}
                        />
                        </span></MDBCol>
                        <MDBCol className='d-flex align-items-center'>
                        <i className='ion-md-create' style={{cursor: 'pointer'}} onClick={this.focus(4)} />
                        </MDBCol>
      </MDBRow>
    </MDBContainer>
                     </span>
                    <span className='SpanLibel'></span>
                    
                </div>

                </form>
                
                
                
                </div>
                </div>
            
        )
    }
}

export default DetailsCompte