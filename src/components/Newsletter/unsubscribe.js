import React, { useState } from 'react';
import { Snackbar, Typography, Input, IconButton, InputAdornment } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import NavigateBeforeRoundedIcon from '@material-ui/icons/NavigateBeforeRounded';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { Helmet } from 'react-helmet';
import Image from '../../images/unsubscribe.png';
import firebase from '../firebase';
import MuiAlert from '@material-ui/lab/Alert';

const styles = () => ({
    button:
    {
        color: '#4caf50',
        width: 175,
        height: 50,
        fontSize: 18,
        backgroundColor: 'transparent',
        border: '3px solid #4caf50',
        borderRadius: 25,
        transition: 'all 0.4s ease-out',
        '&:hover':
		{
            color: 'white',
			backgroundColor: green[500]
		}
    },
    input:
    {
        backgroundColor: '#ececec',
        height: 40,
        width: 250,
        marginTop: 10,
        marginBottom: 5,
        borderTopRightRadius: 3,
        borderBottomRightRadius: 3,
        fontFamily: '"Varela Round", sans-serif',
        ['@media (max-width: 400px)']:
        {
            width: '70%'
        }
    },
    arrowButton:
    {
        height: 40,
        width: 40,
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

const theme = createMuiTheme({
	typography:
	{
		allVariants:
		{
			fontFamily: `"Varela Round", sans-serif`,
		},
        h6:
        {
            textAlign: 'center',
            paddingBottom: 15,
            fontWeight: 600,
            lineHeight: 1.2
        }
	}
});

function Unsubscribe(props)
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
        <div className="full-container">
            <Helmet><title>האיש והמילה הכתובה | ביטול רישום</title></Helmet>
            <div className="page-container">
                <MuiThemeProvider theme={theme}>
                    <Typography variant="h4">ביטול הרשמה לניוזלטר</Typography>
                </MuiThemeProvider>
                <hr />
                <div className="content-container">
                    <div className="image-container">
                        <img src={Image} alt="Unsubscribe" />
                    </div>
                    <div className="textfield">
                        <Input className={classes.input} 
                            value={email}
                            type="email"
                            autoComplete="off"
                            disableUnderline 
                            placeholder="המייל שלך"
                            startAdornment={<InputAdornment position="start" />} 
                            onChange={e => setEmail(e.target.value)} />
                        <IconButton className={classes.arrowButton} onClick={unsubscribe}>
                            <NavigateBeforeRoundedIcon style={{color: 'white'}} />
                        </IconButton>
                    </div>
                </div>
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
                        <Typography variant="subtitle2" align="center">{snackbarMessage}</Typography>
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
        </div>
    )

    async function unsubscribe()
    {
        try
        {
            if (await firebase.unsubscribe(email))
            {
                setEmail('');
                setOpen(true);
                setSnackbarMessage('הרישום בוטל בהצלחה, מיד תועבר לדף הבית');
                setTimeout(() => 
                {
                    props.history.replace("/");
                }, 3500);
            }
            else
            {
                setOpenError(true);
                setSnackbarMessage('כתובת המייל לא קיימת במערכת');
            }
        }
        catch (error)
        {
            alert(error.message);
        }
    }
}

export default withStyles(styles)(Unsubscribe);