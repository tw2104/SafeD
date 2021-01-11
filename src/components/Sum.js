import React, { useState } from 'react';
// import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import axios from 'axios';

// function preventDefault(event) {
//   event.preventDefault();
// }

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits() {
  const classes = useStyles();

  const [sum, setSum] = useState();

  
  const handleUpdate = () => {
    axios.get('/api/record/all_pos')
      .then(response => {
        const data = response.data.data;
        setSum(data);
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
    sum ? (
    <React.Fragment>
      <Title>Total Cases</Title>
      <Typography component="p" variant="h1">
        {sum.count}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        {sum.date}
      </Typography>
      {/* <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div> */}
    </React.Fragment>) : (<div><p>Loading...</p></div>)
  );
}