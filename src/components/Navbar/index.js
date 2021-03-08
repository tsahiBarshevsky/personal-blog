import React, { useState } from 'react';
import { useMediaQuery } from "react-responsive";
import Socials from "./socials";
import NavLinks from "./navLinks";
import { DeviceSize } from "../Responsive";
import MobileNavLinks from "./mobileNavLinks";
import { animateScroll as scroll } from 'react-scroll';
import logo from '../../images/logo.png'

const toggleHome = () => 
{
    scroll.scrollToTop();
};

export default function Navbar() 
{
    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
    const [navbar, setNavbar] = useState(false);
    const [color, setColor] = useState('#123456');

    const changeBackground = () =>
    {
        if (window.scrollY >= 110)
        {
            setNavbar(true);
            setColor('white');
        }
        else
        {
            setNavbar(false);
            setColor('black');
        }
    }

    window.addEventListener('scroll', changeBackground);

    return (
        <div className={navbar ? "navbar-container active" : "navbar-container"}>
            <div className="left-section">
                <div className="logo-wrapper">
                    <img src={logo} alt="לוגו" onClick={toggleHome} aria-lable="flaticon" />
                </div>
            </div>
            <div className="middle-section">
                {!isMobile && <NavLinks />}
            </div>
            <div className="right-section">
                {!isMobile && <Socials />}
                {isMobile && <MobileNavLinks />}
            </div>
        </div>
    )
}