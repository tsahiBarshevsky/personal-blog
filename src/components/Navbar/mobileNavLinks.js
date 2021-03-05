import React, { useState } from 'react';
import { Link } from 'react-scroll';
import MenuToggle from './menuToggle';
import Socials from "./socials";

export default function MobileNavLinks() 
{
    const [isOpen, setOpen] = useState(false);

    return (
        <div className="navlinks-container">
            <MenuToggle isOpen={isOpen} toggle={() => setOpen(!isOpen)} />
            {isOpen ? 
                <ul className="links-wrapper">
                    <li className="link-item">
                        <Link className="link" to='about'
                            smooth={true} duration={1000} spy={true}
                            exact='true' offset={-55}
                            onClick={() => setOpen(!isOpen)}>אודות</Link>
                    </li>
                    <li className="link-item">
                        <Link className="link" to='posts'
                            smooth={true} duration={1000} spy={true}
                            exact='true' offset={-20}
                            onClick={() => setOpen(!isOpen)}>אחרונים</Link>
                    </li>
                    <li className="link-item">
                        <Link className="link" to='/'>לינק 3</Link>
                    </li>
                    <Socials />
                </ul>  
            : null}  
        </div>
    )
}