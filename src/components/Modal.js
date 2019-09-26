import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {TextField,Button} from '@material-ui/core/';
import { createMuiTheme, withStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/PersonAdd';
import CheckUcin from'@material-ui/icons/Check';
import CancelIcon from '@material-ui/icons/Clear'


const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function TransitionsModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const ColorButton = withStyles(theme => ({
    root: {
      color: '#fff',
      backgroundColor: '#303030',
      '&:hover': {
        backgroundColor: '#000000',
      },
    },
  }))(Button);

  return (
    <div>
      <span className='AddPerson'><ColorButton onClick={handleOpen}  variant="outlined" color="default" size="small" className=''>
        <SaveIcon className='mr-2' />
        Inviter un utilisateur

            </ColorButton></span>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div  className='ModalStyle'>
            <div className='TextModal'>
            <h1>Confirmation code sent</h1>
            <p >It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing</p>
            <p>Whait for 1 minute and click here to <a href="#">Resend the Confirmation code</a> </p>
            </div>
            <TextField
              style={{width: '400px',}}
               id="outlined-bare"
                placeholder="XXX-XXX"
                margin="dense"
                variant="outlined"
                inputProps={{ 'aria-label': 'bare' }}
            />
            <span className='d-flex justify-content-end mt-4'>
        <Button  variant="outlined"  >
          <CancelIcon className='mr-2'/>
                  Cancel
              </Button>
              <Button style={{backgroundColor: '#000', color: '#fff'}} variant="outlined" color="default" className='ml-4 mr-5'>
        <CheckUcin className='mr-2' />
        Confirmer
            </Button>
    </span>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}