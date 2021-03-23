import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import PostAddIcon from '@material-ui/icons/PostAdd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { BsNewspaper } from 'react-icons/bs';
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
                        <p className="text">מעבר לאתר</p>
                    </Link>
                    <div className="space" />
                    <Link className="links" to='/editor'>
                        <PostAddIcon />
                        <p className="text">פוסט חדש</p>
                    </Link>
                    <div className="space" />
                    <Link className="links" to='/newsletter'>
                        <BsNewspaper id="newsletter" />
                        <p className="text">ערוך ניוזלטר</p>
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