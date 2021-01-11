import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import Dashboard from './Dashboard';
import Record from './Record';


function Home(props) {

    const { user, isAuthenticated } = useAuth0();

   

    if(!isAuthenticated) {
        return (<></>);
    } else {

        const emailEndPoint = user.email.substring(user.email.indexOf('@') + 1);
        const userType = emailEndPoint === 'nyu.edu' ? 'Management' : 'Staff';

        if (userType === 'Management') {
            return (
                <div>
                    <Dashboard userType={userType} />
                </div>
                );
        } else {
            return (
                <div>
                    <Record userType={userType} />
                </div>
                );
        }
    }
}

export default Home;