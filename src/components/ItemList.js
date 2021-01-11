import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LayersIcon from '@material-ui/icons/Layers';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import FormDialog from './FormDialog';


export default function ListItems(props) {

  const [open, setOpen] = React.useState(false);
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (props.userType === 'Management') {
    return(
      <>
      <List>
      <div>
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" onClick={(e) => props.handleClickChange(e)} /> 
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Record" onClick={(e) => props.handleClickChange(e)} />
      </ListItem>
      <Divider />
      <ListSubheader inset>What's New in Our 2.0</ListSubheader>
      <ListItem button>
        <ListItemIcon>
          <LocalShippingIcon />
        </ListItemIcon>
        <ListItemText primary="Track Delivery" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <SupervisedUserCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Possible Infected" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <LocalHospitalIcon />
        </ListItemIcon>
        <ListItemText primary="Synchronization" />
      </ListItem>
    </div>
    </List>
    <FormDialog open={open} handleClose={handleClose} />
    </>
    );
  } else {
    return(
      <>
      <List>
      <div>
      <ListItem button>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Record" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <CloudUploadIcon />
        </ListItemIcon>
        <ListItemText primary="Upload" onClick={handleClickOpen} />
      </ListItem>
      <Divider />
      <ListSubheader inset>What's New in Our 2.0</ListSubheader>
      <ListItem button>
        <ListItemIcon>
          <LocalShippingIcon />
        </ListItemIcon>
        <ListItemText primary="Track Delivery" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <SupervisedUserCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Possible Infected" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <LocalHospitalIcon />
        </ListItemIcon>
        <ListItemText primary="Synchronization" />
      </ListItem>
    </div>
    </List>
     <FormDialog open={open} handleClose={handleClose} />
     </>
    );
  }
}
