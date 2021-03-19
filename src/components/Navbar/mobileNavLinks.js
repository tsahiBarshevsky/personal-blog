import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuToggle from './menuToggle';
import Socials from "./socials";

const style = { display: 'flex', alignSelf: 'flex-start', paddingTop: 20 };

export default function MobileNavLinks() 
{
    const [isOpen, setOpen] = useState(false);

    return (
        <div className="navlinks-container">
            <MenuToggle isOpen={isOpen} toggle={() => setOpen(!isOpen)} />
            {isOpen ? 
                <ul className="links-wrapper">
                    <li className="link-item">
                        <Link className="link" to='/about'>אודות</Link>
                    </li>
                    <li className="link-item">
                        <Link className="link" to='/categories'>קטגוריות</Link>
                    </li>
                    <li className="link-item">
                        <a target="_blank" className="link" 
                            href='https://www.instagram.com/tsahi_barshavsky/'
                            onClick={() => setOpen(!isOpen)}>האינסטגרם שלי</a>
                    </li>
                </ul>  
            : null}  
        </div>
    )
}