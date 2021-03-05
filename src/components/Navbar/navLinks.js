import React from 'react';
import { Link } from 'react-scroll';
import { Link as LinkR } from 'react-router-dom';

function navLinks() {
    return (
        <div className="navlinks-container">
            <ul className="links-wrapper">
                <li className="link-item">
                    <Link className="link" to='about'
                        smooth={true} duration={1000} spy={true}
                        exact='true' offset={-55}>אודות</Link>
                </li>
                <li className="link-item">
                    <Link className="link" to='posts'
                        smooth={true} duration={1000} spy={true}
                        exact='true' offset={-20}>פוסטים אחרונים</Link>
                </li>
                <li className="link-item">
                    <LinkR className="link" to='/categories'>קטגוריות</LinkR>
                </li>
            </ul>
        </div>
    )
}

export default navLinks
