import React, { Component } from 'react'

import 'semantic-ui-css/semantic.min.css'
import { Button } from '@material-ui/core/';
import SaveIcon from '@material-ui/icons/Save';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { Segment, Sidebar } from "semantic-ui-react";
import { stitchClient } from './const'
import { RemoteMongoClient } from 'mongodb-stitch-browser-sdk';
import { DataBase } from './const';
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const mongodb = stitchClient.getServiceClient(
  RemoteMongoClient.factory,
  "mongodb-atlas"
);
const db = mongodb.db(DataBase);
const collection = db.collection('Utilisateur');
const email = localStorage.getItem('email');

const query = { "email": email };
const options = { "upsert": false };

// const HorizontalSidebar = ({ animation, direction, visible }) => (
//     <Sidebar
//       as={Segment}
//       animation='push'
//       direction='top'
//       visible={visible}
//       className=''
//     >           <h2 style={{color:'black'}} className='float-left'>Detail Du Compte</h2>
//     <span className='d-flex justify-content-end'>
//         <Button  variant="outlined"  >
//                   Cancel
//               </Button>
//               <Button style={{backgroundColor: '#000', color: '#fff'}} variant="outlined" color="default" size="small" className='ml-2'>
//               <SaveIcon className='mr-2' />
//               Save
//             </Button>
//     </span>

//     </Sidebar>
//   );

const LoginError = (props) => {
  if (props.displaySucc) {
    return (<div style={{ color: 'green', fontWeight: 'bold' }} id="results" className="search-results pt-2">
      modifié avec succès
    </div>)
  } else return null
};
class DetailsCompte extends Component {

  constructor(props) {
    super(props);
    this.state = {
      denomination: '',
      contact: '',
      lorem: '',
      site_web: '',
      animation: "push",
      direction: "top",
      displaySucc: false,
      dimmed: false,
      visible: false,
      isloading: true,
      isloadingUpdate: false,
      disabled: true
    };
    // create a ref to store the textInput DOM element
    this.refDeno = React.createRef();
    this.refContact = React.createRef();
    this.refTest = React.createRef();
    this.refSite = React.createRef();
    this.inputFocusNav = this.inputFocusNav.bind(this);
    this.display = this.display.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.focus = this.focus.bind(this);
    if (email === null) {
      window.location = "/";
    }
  }
  componentDidMount() {
    this.display();
  }

  display() {
    collection.findOne({ email: email }).then(_user => {
      this.setState({ isloading: false });
      this.setState({ disabled: false });
      if (_user.Denomination !== undefined) {
        localStorage.setItem('Deno', _user.Denomination);
        localStorage.setItem('contact', _user.Contact);
        localStorage.setItem('lorem', _user.Lorem);
        localStorage.setItem('siteweb', _user.Site_WEB);

        this.setState({
          denomination: _user.Denomination,
          contact: _user.Contact,
          lorem: _user.Lorem,
          site_web: _user.Site_WEB,
        });

      }
    }).catch(err => console.error(`Error: ${err}`));
  }

  focus = num => () => {
    if (!this.state.visible) {
      this.handleAnimationChange('push');
    }
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

  }

  handleAnimationChange = animation => () =>
    this.setState(prevState => ({ animation, visible: !prevState.visible }));

  handleDimmedChange = (e, { checked }) => this.setState({ dimmed: checked });

  handleDirectionChange = direction => () =>
    this.setState({ direction, visible: false });


  handleSubmit = (e) => {
    var animation = 'push';
    this.setState({ isloadingUpdate: true });
    this.setState(prevState => ({ animation, visible: !prevState.visible }));
    e.preventDefault();
    const update = {
      "$set": {
        "Denomination": this.state.denomination,
        "Contact": this.state.contact,
        "Lorem": this.state.lorem,
        "Site_WEB": this.state.site_web,
      }
    };

    collection.updateOne(query, update, options)
      .then(
        this.setState({ isloadingUpdate: false }),
        this.setState({ displaySucc: true }),


      )
      .catch(err => console.error(`Failed to add review: ${err}`), this.setState({ isloadingUpdate: false })
      )

  }

  handleChange(e) {
    let target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  }
  inputFocusNav() {
    var animation = 'push';
    if (!this.state.visible) {
      this.setState(prevState => ({ animation, visible: !prevState.visible }));
    }
  }


  render() {
    const { visible } = this.state;
    return (
      <div className=" bgcolor w-100 d-inline-flex">

        <div className="w-100" style={{ height: 'fit-content', marginLeft: '300px' }}>
          <form onSubmit={this.handleSubmit} >
            <div>
              <Sidebar.Pushable style={{ height: '200px' }}>
                <Sidebar
                  as={Segment}
                  animation='push'
                  direction='top'
                  visible={visible}>

                  <h1 style={{ color: 'black', margin: '10px 0 0 6px ' }}>Detail Du Compte</h1>

                  <span className='d-flex justify-content-end'>
                    <Button variant="outlined" onClick={this.handleAnimationChange('push')}  >
                      Annuler
                            </Button>
                    <Button type="submit" style={{ backgroundColor: '#000', color: '#fff' }} variant="outlined" color="default" size="small" className='ml-2'>
                      <SaveIcon className='mr-2' />
                      Modifier
                          </Button>
                  </span>

                </Sidebar>

                <div className='d-flex'>
                  <h1 style={{ color: 'black', margin: '20px 0 0 20px ' }}>Detail Du Compte</h1>
                  <span className='pt-4 pl-2'>
                    <Loader
                      type="Puff"
                      color="#00BFFF"
                      visible={this.state.isloading}
                      height={40}
                      width={40}
                    />
                  </span>
                </div>

              </Sidebar.Pushable>
            </div>

            <div className='detailsContainer' style={{ minWidth: '600px' }}>
              <LoginError displaySucc={this.state.displaySucc} />
              <span className='FormCN'>
                <MDBContainer className='MDBContainer' >
                  <Loader
                    type="Puff"
                    color="#00BFFF"
                    visible={this.state.isloadingUpdate}
                    height={40}
                    width={40}
                  />

                  <MDBRow className='rowCont '>
                    <MDBCol className=' pt-3 d-flex align-items-center'><label className='labelCN'>Dénomination</label>
                    </MDBCol>
                    <MDBCol className='align-items-center ml-5'><span >
                      <input
                        className='mt-2'
                        style={{ width: '300px', height: '37px', border: '0' }}
                        id="outlined-bare"
                        ref={this.refDeno}
                        onFocus={this.inputFocusNav}
                        name='denomination'
                        value={this.state.denomination}
                        margin="dense"
                        variant="outlined"
                        disabled={this.state.disabled}
                        onChange={this.handleChange}
                        inputprops={{ 'aria-label': 'bare' }}
                      />
                    </span></MDBCol>
                    <MDBCol className='d-flex align-items-center'>
                      <i className='ion-md-create' style={{ cursor: 'pointer' }} onClick={this.focus(1)} />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className='midRow'>
                    <MDBCol className='pt-3 d-flex align-items-center'><label className='labelCN'>Contact</label>
                    </MDBCol>
                    <MDBCol className='align-items-center ml-5'><span >
                      <input
                        className='mt-2'
                        style={{ width: '300px', height: '37px', border: '0' }}
                        id="outlined-bare"
                        ref={this.refContact}
                        name='contact'
                        onFocus={this.inputFocusNav}
                        value={this.state.contact}
                        margin="dense"
                        variant="outlined"
                        disabled={this.state.disabled}
                        onChange={this.handleChange}
                        inputprops={{ 'aria-label': 'bare' }}
                      />
                    </span></MDBCol>
                    <MDBCol className='d-flex align-items-center'>
                      <i className='ion-md-create' style={{ cursor: 'pointer' }} onClick={this.focus(2)} />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className='midRow'>
                    <MDBCol className=' pt-3 d-flex align-items-center'><label className='labelCN'>Lorem</label>
                    </MDBCol>
                    <MDBCol className='align-items-center ml-5'><span >
                      <input
                        className='mt-2'
                        style={{ width: '300px', height: '37px', border: '0' }}
                        id="outlined-bare"
                        ref={this.refTest}
                        name='lorem'
                        value={this.state.lorem}
                        onFocus={this.inputFocusNav}
                        margin="dense"
                        variant="outlined"
                        disabled={this.state.disabled}
                        onChange={this.handleChange}
                        inputprops={{ 'aria-label': 'bare' }}
                      />
                    </span></MDBCol>
                    <MDBCol className='d-flex align-items-center'>
                      <i className='ion-md-create' style={{ cursor: 'pointer' }} onClick={this.focus(3)} />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className='lastRow'>
                    <MDBCol className=' pt-3 d-flex align-items-center'><label className='labelCN'>Site WEB</label>
                    </MDBCol>
                    <MDBCol className='align-items-center ml-5'><span >
                      <input
                        className='mt-2'
                        style={{ width: '300px', height: '37px', border: '0' }}
                        id="outlined-bare"
                        ref={this.refSite}
                        name='site_web'
                        value={this.state.site_web}
                        onFocus={this.inputFocusNav}
                        margin="dense"
                        onChange={this.handleChange}
                        variant="outlined"
                        disabled={this.state.disabled}
                        inputprops={{ 'aria-label': 'bare' }}
                      />
                    </span></MDBCol>
                    <MDBCol className='d-flex align-items-center'>
                      <i className='ion-md-create' style={{ cursor: 'pointer' }} onClick={this.focus(4)} />
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