import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@material-ui/core';
import React from 'react';
import logo from '../assets/images/logo.png';
import '../style.css';
import '../bootstrap.css';


function Login(props) {

    const { isAuthenticated, loginWithRedirect } = useAuth0();

    if(isAuthenticated) {
        return (<></>);
    } else {
        return (
                <div class="center">
                <div class="col-md-10 text-center pt-5">
                    <h1 class="site-heading site-animate"><strong class="d-block">Welcome back !</strong></h1>
                    <Button  onClick={() => loginWithRedirect()} > <img height="150" width="250" src={logo} alt="Logo"></img></Button>
                </div>
                </div>
        );
    }
}

export default Login;