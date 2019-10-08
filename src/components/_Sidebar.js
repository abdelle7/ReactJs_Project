import React, { Component } from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Button } from '@material-ui/core/';
import SaveIcon from '@material-ui/icons/Save';
import { Segment, Sidebar } from "semantic-ui-react";

class _Sidebar extends Component {

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


  render() {
    const { visible } = this.state;
    return (
      <Sidebar.Pushable style={{ height: '100px' }}>
        <Sidebar
          as={Segment}
          animation='push'
          direction='top'
          visible={visible}>
          <h2 style={{ color: 'black' }} className='float-left'>Detail Du Compte</h2>
          <span className='d-flex justify-content-end'>
            <Button variant="outlined" onClick={this.handleAnimationChange('push')}  >
              Cancel
                      </Button>
            <Button style={{ backgroundColor: '#000', color: '#fff' }} variant="outlined" color="default" size="small" className='ml-2'>
              <SaveIcon className='mr-2' />
              Save
                    </Button>
          </span>

        </Sidebar>
        <div className='d-flex justify-content-between'>
          <h1 style={{ color: 'black', margin: '20px 0 0 20px ' }}>Detail Du Compte</h1>
        </div>

      </Sidebar.Pushable>
    )
  }
}

export default _Sidebar