import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

// const useStyles = makeStyles({
//   root: {
//     // color: '#32a852'
//   }
// });

export default function Title(props) {
  // const classes = useStyles();

  return (
    <Typography component="h2" variant="h6" color='primary' gutterBottom>
      {props.children}
    </Typography>
  );
}

Title.propTypes = {
  children: PropTypes.node,
};