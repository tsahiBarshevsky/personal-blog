import React, { useState } from 'react';
import { useMediaQuery } from "react-responsive";
import Socials from "./socials";
import NavLinks from "./navLinks";
import { DeviceSize } from "../Responsive";
import MobileNavLinks from "./mobileNavLinks";
import { animateScroll as scroll } from 'react-scroll';
import logo from '../../images/logo.png'

export default function Navbar() 
{
    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
    const [navbar, setNavbar] = useState(false);

    const toggleHome = () => 
    {
        if (window.location.pathname === '/')
            scroll.scrollToTop();
        else
            window.location.replace('/');
    }

    const changeBackground = () =>
    {
        window.scrollY >= 70 ? setNavbar(true) : setNavbar(false);
    }

    if (window.location.pathname === '/')
        window.addEventListener('scroll', changeBackground);

    return (
        <div style={
            window.location.pathname !== '/' ? 
            { backgroundColor: '#222222',
              boxShadow: '0 2px 3px rgba(15, 15, 15, 0.25)' } : {}} 
            className={isMobile || navbar ? "navbar-container active" : "navbar-container"}>
            <div className="left-section">
                <div className="logo-wrapper">
                    <img src={logo} alt="לוגו" onClick={toggleHome} />
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