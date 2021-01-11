import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
      width: '30ch',
    },
  },
}));

const resultList = ['Positive', 'Negtive'];

export default function FormDialog(props) {

    const form = React.useRef(null);

    const classes = useStyles();

    const [record, setRecord] = React.useState();

    // const [selectedDate, setSelectedDate] = React.useState(new Date());

    // const handleDateChange = (date) => {
    //     setSelectedDate(date);
    // };

    const submitForm = e => {
      e.preventDefault()
      axios.post('/api/record', record)
        .then(response => {
          console.log(response);
          axios.get(`/api/send_txt/${record.location}/${record.phone}/${record.testResult}`)
          .then(response => {
            console.log(response);
          })
          .catch(err => {
            console.log(err);
          });
          alert('Your form has been sumbitted successfully.');
        })
        .catch(err => {
          console.log(err);
          alert('Your form is invalid.\nPlease resumbit.');
        });  
      props.handleClose();
    }

  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">COVID-19 Test Form</DialogTitle>
        <DialogContent>
          <DialogContentText>
            any additional information.
          </DialogContentText>
          <form ref={form} className={classes.root} autoComplete="off">
          <div >
            <TextField 
                required 
                id="employee" 
                label="Employee ID" 
                // value={record.employeeId} 
                onChange={e => setRecord({ ...record, employeeId: e.target.value})}
            />
            <TextField
                required
                id="phone"
                label="Phone Number"
                // value={record.phone}
                onChange={e => setRecord({ ...record, phone: e.target.value})}
            />
            <TextField 
                id="firstName" 
                label="First Name" 
                type="name" 
                // value={record.firstName}
                onChange={e => setRecord({ ...record, firstName: e.target.value})}
            />
            <TextField 
                id="lastName" 
                label="Last Name" 
                type="name" 
                // value={record.lastName}
                onChange={e => setRecord({ ...record, lastName: e.target.value})}
            />
            <TextField
                required
                id="date"
                label="Test Date"
                type="date"
                defaultValue="2020-12-01"
                // value={record.date}
                onChange={e => setRecord({ ...record, date: e.target.value})}
            />
             <TextField
                id="location"
                label="Location"
                type="location"
                // value={record.location}
                onChange={e => setRecord({ ...record, location: e.target.value})}
            />
            <TextField
                required
                id="result"
                select
                label="Test Result"
                // value={record.result}
                onChange={e => setRecord({ ...record, testResult: e.target.value})}
                variant="outlined"
            >
                {resultList.map((option) => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </TextField>
        </div>
      </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={submitForm} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
