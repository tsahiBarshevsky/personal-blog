import React from 'react';
import firebase from '../firebase';
import { withRouter } from 'react-router-dom';
import { Button } from '@material-ui/core';

function Dashboard(props) {

    if (!firebase.getCurrentUsername()) {
		props.history.replace('/admin');
		return null;
	}

    return (
        <div className="container">
            <Button onClick={logout}>התנתק</Button>
        </div>
    )

    async function logout() {
		await firebase.logout();
		props.history.push('/');
	}
}

export default withRouter(Dashboard);