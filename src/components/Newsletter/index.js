import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import firebase from '../firebase';
import { withStyles, createMuiTheme, MuiThemeProvider, ThemeProvider, StylesProvider, jssPreset } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import rtl from 'jss-rtl';
import { create } from 'jss';
import { Button, Typography, FormControl, TextField, Snackbar } from '@material-ui/core';
import { Helmet } from 'react-helmet';
import { green } from '@material-ui/core/colors';

const styles = () => ({
    button:
    {
        color: 'white',
        width: 70,
        height: 40,
        fontSize: 17,
        backgroundColor: green[500],
        borderRadius: 15,
        marginLeft: 5,
        marginRight: 5,
        transition: 'all 0.5s ease-out',
        '&:hover':
		{
			backgroundColor: green[300]
		}
    },
    input:
    {
        margin: '10px 0'
    }
});

const theme = createMuiTheme({
	typography:
	{
		allVariants:
		{
			fontFamily: `"Varela Round", sans-serif`,
		},
        h5:
        {
            textDecoration: 'underline'
        }
	},
    direction: "rtl"
});

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

function Newsletter(props) 
{
    const [emails, setEmails] = useState([]);
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');
    const [open, setOpen] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [counter, setCounter] = useState(0);
    const [stop, setStop] = useState(false);
    const { classes } = props;

    useEffect(() => {
        firebase.getListOfSubscribes().then(setEmails);
    }, []);

    if (!firebase.getCurrentUsername()) {
		props.history.replace('/admin');
		return null;
	}
    
    if (counter !== 0 && counter === emails.length && !stop)
    {
        setOpen(true);
        setSnackbarMessage('המיילים נשלחו בהצלחה!');
        setTimeout(() => 
        {
            props.history.replace("/dashboard");
        }, 3500);
        setStop(true);
    }

    function sendEmail(e) 
    {
        e.preventDefault();
        const SERVICE_ID = 'gmail';
        const TEMPLATE_ID = 'template_j9m3lgd';
        const userID = 'user_9vrQoOJQawogbknu0xWOi';

        emails.map((email) =>
        {
            var formattedContent = [];
            content.split('\n').map(x => x !== '' ? formattedContent.push(x) : formattedContent.push('<br />'));
            var templateParams = {
                subscriber: email,
                subjuect: subject,
                content: formattedContent.join(' ')
            };

            emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, userID)
            .then(function(response)
            {
                console.log('SUCCESS!', response.status, response.text);
                setCounter(counter + 1);
            }, 
            function(error) 
            {
                console.log('FAILED...', error);
                setSnackbarMessage('קרתה שגיאה, נסה שנית');
                setOpenError(true);
            });
        });
    }

    function clearForm()
    {
        setSubject('');
        setContent('');
    }

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
        <div className="newsletter-editor-container">
            <Helmet><title>{`האיש והמילה הכתובה | עריכת ניוזלטר`}</title></Helmet>
            <div className="newsletter-editor">
                <ThemeProvider theme={theme}>
                    <Typography variant="h5" gutterBottom>{`עריכת ניוזלטר`}</Typography>
                </ThemeProvider>
                <StylesProvider jss={jss}>
                    <MuiThemeProvider theme={theme}>
                        <FormControl margin="normal" fullWidth>
                            <TextField label="נושא"
                                id="subject" name="subject"
                                variant="outlined"
                                autoComplete="off" 
                                value={subject} 
                                onChange={e => setSubject(e.target.value)} 
                                className={classes.input} />
                            <TextField label="תוכן ההודעה"
                                id="content" name="content"
                                multiline
                                variant="outlined"
                                autoComplete="off" 
                                value={content} 
                                onChange={e => setContent(e.target.value)}
                                className={classes.input} />
                        </FormControl>
                    </MuiThemeProvider>
                </StylesProvider>
                <div className="buttons">
                    <Button variant="contained" onClick={sendEmail} className={classes.button}>שלח</Button>
                    <Button variant="contained" onClick={clearForm} className={classes.button}>נקה</Button>
                </div>
                <ThemeProvider theme={theme}>
                    <Typography variant="h5" gutterBottom>{`תצוגה מקדימה`}</Typography>
                </ThemeProvider>
                {content !== '' ? content.split('\n').map(x => x !== '' ? <p>{x}</p> : <br />) : null}
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
        </div>
    );
}

export default withStyles(styles)(Newsletter);