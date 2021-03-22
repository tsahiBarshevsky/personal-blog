import React, { useState } from 'react';
import { Grid, Input, IconButton, Typography, InputAdornment, Snackbar } from '@material-ui/core';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import NavigateBeforeRoundedIcon from '@material-ui/icons/NavigateBeforeRounded';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { GiWorld } from 'react-icons/gi';
import firebase from '../firebase';

const styles = () => ({
    input:
    {
        backgroundColor: 'white',
        height: 30,
        width: 200,
        marginTop: 10,
        marginBottom: 5,
        borderTopRightRadius: 3,
        borderBottomRightRadius: 3,
        fontFamily: '"Varela Round", sans-serif'
    },
    button:
    {
        height: 30,
        width: 30,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: 3,
        borderBottomLeftRadius: 3,
        marginTop: 10,
        marginBottom: 5,
        backgroundColor: '#159753',
        '&:hover': { backgroundColor: '#159753' },
        '&:active': { backgroundColor: '#14663c' }
    }
});

const breakpoints = createBreakpoints({});
const theme = createMuiTheme({
	typography:
	{
		allVariants: { fontFamily: `"Varela Round", sans-serif` },
        body1: { lineHeight: 1.25 },
        subtitle1: { lineHeight: 1.25 },
        h6: { marginRight: 10 },
        body2: 
        { 
            marginBottom: 5, 
            [breakpoints.down("xs")]:
            {
                width: '80%'
            }
        }
	}
});

function Footer(props) 
{
    const [email, setEmail] = useState('');
    const [open, setOpen] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const { classes } = props;

    const Alert = (props) =>
    {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
    
    const handleClose = () => 
    {
        setOpen(false);
        setOpenError(false);
    }

    return (
        <footer>
            <div className="polygon" />
            <div className="information">
                <Grid spacing={2} container direction="row" justify="center" alignItems="flex-start">
                    <Grid item>
                        <div className="about-me">
                            <MuiThemeProvider theme={theme}>
                                <div className="title"><Typography variant="h6">קצת עליי</Typography></div>
                                <Typography variant="body1">
                                    צחי "האיש והמילה הכתובה" ברשבסקי. היפי בהסוואה, כותב את מה שהלב צועק ואיש אינו שומע, רודף אחרי שקיעות ומוצא בהן השראה. בואו למצוא אותי בין השורות.
                                </Typography>
                            </MuiThemeProvider>
                        </div>
                    </Grid>
                    <Grid item>
                        <div className="newsletter">
                            <MuiThemeProvider theme={theme}>
                                <div className="title"><Typography variant="h6">ניוזלטר</Typography></div>
                                <Typography variant="subtitle1">הישארו מעודכנים בפוסטים האחרונים שלי, מבטיח לא להציק יותר מדי :)</Typography>
                            </MuiThemeProvider>
                            <div className="newsletter-textfield">
                                <Input className={classes.input} 
                                    value={email}
                                    autoComplete="off"
                                    disableUnderline 
                                    placeholder="המייל שלך"
                                    startAdornment={<InputAdornment position="start" />} 
                                    onChange={e => setEmail(e.target.value)} />
                                <IconButton className={classes.button} onClick={addSubscribe}>
                                    <NavigateBeforeRoundedIcon className="icon" />
                                </IconButton>
                            </div>
                        </div>
                    </Grid>
                    <Grid item>
                        <div className="socials">
                            <MuiThemeProvider theme={theme}>
                                <div className="title"><Typography variant="h6">נשמור על קשר?</Typography></div>
                                <Typography variant="subtitle1">תוכלו למצוא אותי ברשתות החברתיות וגם פוסטים נוספים באתר הבלוגרים</Typography>
                            </MuiThemeProvider>
                            <div className="icons">
                                <a href="https://www.facebook.com/tsahi.barshavsky/" target="_blank">
                                    <FaFacebookF className="icon" />
                                </a>
                                <a href="https://www.instagram.com/tsahi_barshavsky/" target="_blank">
                                    <FaInstagram className="icon" />
                                </a>
                                <a href="https://www.thebloggers.co.il/author/tsahib/" target="_blank">
                                    <GiWorld className="icon" style={{ marginRight: 2}} />
                                </a>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
            <div className="copyright">
                <MuiThemeProvider theme={theme}>
                    <Typography variant="body2">
                        האיש והמילה הכתובה &bull; כל הזכויות שמורות לצחי ברשבסקי &copy; {new Date().getFullYear()}
                    </Typography>
                </MuiThemeProvider>
            </div>
            <Snackbar onClick={handleClose}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
                }}
                open={open}
                autoHideDuration={4000}
                onClose={handleClose}
                message={
                    <MuiThemeProvider theme={theme}>
                        <Typography variant="subtitle1" align="center">{snackbarMessage}</Typography>
                    </MuiThemeProvider>}
            />
            <Snackbar open={openError} autoHideDuration={3500} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    <MuiThemeProvider theme={theme}>
                        <Typography align="center" variant="subtitle1">
                            {snackbarMessage}
                        </Typography>
                    </MuiThemeProvider>
                </Alert>
            </Snackbar>
        </footer>
        // <section className="footer-container">
        //     <div className="footer-content">
        //         <div className="text">
        //             <Typography variant="subtitle1">
        //                 האיש והמילה הכתובה &bull; כל הזכויות שמורות &copy; {new Date().getFullYear()}
        //             </Typography>
        //         </div>
        //     </div>
        //     {/*<svg className="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        //         <path fill="#f5f5f5" fill-opacity="1" d="M0,128L48,128C96,128,192,128,288,128C384,128,480,128,576,112C672,96,768,64,864,48C960,32,1056,32,1152,37.3C1248,43,1344,53,1392,58.7L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
        //     </svg>
        //     <svg className="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        //         <path fill="#f5f5f5" fill-opacity="1" d="M0,96L48,101.3C96,107,192,117,288,128C384,139,480,149,576,133.3C672,117,768,75,864,74.7C960,75,1056,117,1152,128C1248,139,1344,117,1392,106.7L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
        //     </svg>*/}
        //     <svg className="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        //         <path fill="#f5f5f5" fill-opacity="1" d="M0,128L80,149.3C160,171,320,213,480,213.3C640,213,800,171,960,154.7C1120,139,1280,149,1360,154.7L1440,160L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
        //     </svg>
        // </section>
    )

    async function addSubscribe()
    {
        var reg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (reg.test(email.trim()))
        {
            try
            {
                await firebase.addSubscribe(email.trim());
                setEmail('');
                setOpen(true);
                setSnackbarMessage('הרישום בוצע בהצלחה!');
            }
            catch(error)
            {
                console.lgo(error.message);
                setOpenError(true);
                setSnackbarMessage('קרתה שגיאה, נסה שנית');
            }
        }
        else
        {
            setOpenError(true);
            setSnackbarMessage('כתובת המייל אינה תקינה');
        }
    }
}

export default withStyles(styles)(Footer);