import React from 'react';
import { Link } from 'react-router-dom';
import firebase from '../firebase';

function navLinks()
{
    return (
        <div className="navlinks-container">
            <ul className="links-wrapper">
                <li className="link-item">
                    <Link className="link" to='/about'>אודות</Link>
                </li>
                <li className="link-item">
                    <Link className="link" to='/categories'>קטגוריות</Link>
                </li>
                {firebase.getCurrentUsername() ? 
                <li className="link-item">
                    <Link className="link" to='/admin'>ניהול</Link>
                </li>
                : null}
            </ul>
        </div>
    )
}

export default navLinks
