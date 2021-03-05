import React, { useState } from 'react';
import { Link } from 'react-scroll';
import MenuToggle from './menuToggle';
import Accessibility from "./accessibility";

export default function MobileNavLinks() 
{
    const [isOpen, setOpen] = useState(false);

    return (
        <div className="navlinks-container">
            <MenuToggle isOpen={isOpen} toggle={() => setOpen(!isOpen)} />
            {isOpen ? 
                <ul className="links-wrapper">
                    <li className="link-item">
                        <Link className="link" to='posts'
                            smooth={true} duration={1000} spy={true}
                            exact='true' offset={-20}
                            onClick={() => setOpen(!isOpen)}>לינק 1</Link>
                    </li>
                    <li className="link-item">
                        <Link className="link" to='/'>לינק 2</Link>
                    </li>
                    <li className="link-item">
                        <Link className="link" to='/'>לינק 3</Link>
                    </li>
                    <Accessibility />
                </ul>  
            : null}  
        </div>
    )
}