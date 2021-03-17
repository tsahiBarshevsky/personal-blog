import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpandLessRoundedIcon from '@material-ui/icons/ExpandLessRounded';
import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles(() => ({
    toTop:
    {
        color: '#424242',
        zIndex: 20,
        position: 'fixed',
        bottom: 7,
        right: 10,
        border: '2px solid #424242',
        backgroundColor: 'transparent',
        transition: '0.3s ease-out',
        "&:hover":
        {
            color: 'white',
            border: '2px solid #007aff',
            backgroundColor: '#007aff',
            transition: '0.3s ease-in',
        }
    },
    arrow:
    {
        fontSize: 60
    }
}));

const BackToTop = ({showBelow}) => 
{
    const clasess = useStyles();
    const [show, setShow] = useState(showBelow ? false : true);
    
    const handleScroll = () =>
    {
        if (window.pageYOffset > showBelow) {
            if (!show) setShow(true);
        } else {
            if (show) setShow(false);
        }
    }

    useEffect(() =>
    {
        if (showBelow)
        {
            window.addEventListener(`scroll`, handleScroll);
            return () => window.removeEventListener(`scroll`, handleScroll);
        }
    })

    const handleClick = () => 
    {
        window['scrollTo']({top: 0, behavior: 'smooth'});
    }

    return (
        <>
           {show &&
                <Fab size="medium" onClick={handleClick} className={clasess.toTop}>
                    <ExpandLessRoundedIcon className={clasess.arrow} />
                </Fab>
           }
        </>
    )
}

export default BackToTop;