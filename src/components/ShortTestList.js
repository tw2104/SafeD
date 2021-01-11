
import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import axios from 'axios'

// Generate Order Data
function createData(id, date, empId, name, result, location) {
  return { id, date, empId, name, result, location};
}

// function preventDefault(event) {
//   event.preventDefault();
// }

// const useStyles = makeStyles((theme) => ({
//   seeMore: {
//     marginTop: theme.spacing(3),
//   },
// }));

export default function ShorTestList() {
  // const classes = useStyles();

  const [rows, setRows] = React.useState();

  const handleUpdate = () => {
    axios.get('/api/record/5')
      .then(response => {
        const data = response.data.data;
        setRows(data.map((row) => 
          createData(row.id, row.date, row.employeeId, row.firstName + ' ' + row.lastName, row.testResult, row.location))
        );
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      }); 
  };

  React.useEffect(() => {
    handleUpdate();
  }, []);
  
  React.useEffect(() => {
      const interval = setInterval(() => {
        handleUpdate();
      }, 5000);
      return () => clearInterval(interval);
  }, []);

  return (
    rows ?
    (<React.Fragment>
      <Title>Latest Records</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Employee ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Result</TableCell>
            <TableCell align="right">Location</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.empId}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.result}</TableCell>
              <TableCell align="right">{row.location}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div> */}
    </React.Fragment> ) : (<div><p>Loading...</p></div>)
  );
}