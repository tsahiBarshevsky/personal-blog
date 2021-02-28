import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/Add';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link, withRouter } from 'react-router-dom';
import firebase from '../firebase';

function Navbar(props) 
{
    return (
        <div className="dasboard-navbar">
            <div className="dashboard-navbar-container">
                <div className="links-container">
                    <Link className="links" to='/'>
                        <HomeIcon />
                        <p className="text">בחזרה לאתר</p>
                    </Link>
                    <div className="space" />
                    <Link className="links" to='/editor'>
                        <AddIcon />
                        <p className="text">פוסט חדש</p>
                    </Link>
                </div>
                <p className="links" onClick={logout}>
                    <ExitToAppIcon />
                    <p className="text">התנתקות</p>
                </p>
            </div>
        </div>
    )

    async function logout() 
    {
		await firebase.logout();
		props.history.push('/');
	}
}

export default withRouter(Navbar);