import React from 'react';
import {BrowserRouter as Router, Route, Link, Switch, useHistory, withRouter, Redirect} from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';

function PrivateRoute(children, ...rest) {

    const { user, isAuthenticated, isLoading } = useAuth0();


    return (
        <Route {...rest} render={(props) => (
            isAuthenticated ? (children) : (<Redirect to={{pathname:'/'}} />)
        )} />
    );
}

export default PrivateRoute;
