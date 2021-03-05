import React from 'react';
import { Link } from 'react-scroll';

function navLinks() {
    return (
        <div className="navlinks-container">
            <ul className="links-wrapper">
                <li className="link-item">
                    <Link className="link" to='posts'
                        smooth={true} duration={1000} spy={true}
                        exact='true' offset={-20}>לינק 1</Link>
                </li>
                <li className="link-item">
                    <Link className="link" to='/'>לינק 2</Link>
                </li>
                <li className="link-item">
                    <Link className="link" to='/'>לינק 3</Link>
                </li>
            </ul>
        </div>
    )
}

export default navLinks
