import React from 'react';
import { useMediaQuery } from "react-responsive";
import Accessibility from "./accessibility";
import NavLinks from "./navLinks";
import { DeviceSize } from "../Responsive";
import MobileNavLinks from "./mobileNavLinks";
import { animateScroll as scroll} from 'react-scroll';

const toggleHome = () => 
{
    scroll.scrollToTop();
};

export default function Navbar() 
{
    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });

    return (
        <div className="navbar-container">
            <div className="left-section">
                <div className="logo-wrapper">
                    <p onClick={toggleHome} className="logo-text">האיש והמילה הכתובה</p>
                </div>
            </div>
            <div className="middle-section">
                {!isMobile && <NavLinks />}
            </div>
            <div className="right-section">
                {!isMobile && <Accessibility />}
                {isMobile && <MobileNavLinks />}
            </div>
        </div>
    )
}