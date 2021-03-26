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