import React, { useState } from 'react';
import { Typography, Paper, Avatar, Button, FormControl, Input, InputAdornment, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter } from 'react-router-dom';
import firebase from '../firebase';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
//import { Helmet } from 'react-helmet';

const styles = theme => ({
	main: 
	{
		width: 'auto',
		display: 'block',
		borderRadius: '20px',
		marginLeft: theme.spacing(3),
		marginRight: theme.spacing(3),
		//backgroundImage: `url(${Background})`,
		backgroundPosition: 'center', 
		backgroundRepeat: 'no-repeat',
		[theme.breakpoints.up(400 + theme.spacing(6))]: {
			width: 400,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	paper: 
	{
		borderRadius: '20px',
		marginTop: theme.spacing(8),
		marginBottom: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		boxShadow: '2px 2px 5px 0px rgba(0, 0, 0, 0.5)',
		backgroundColor: 'rgba(40, 57, 101, 0.5)',
		padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
	},
	input:
	{
		backgroundColor: 'rgba(255, 255, 255, 0.65)',
        height: '40px',
        borderRadius: '25px',
		fontFamily: 'Andika New Basic'
	},
	submit: 
	{
		color: 'white',
		fontSize: '17px',
		textTransform: 'capitalize',
		width: '130px',
		height: '40px',
		border: '2px solid white',
		backgroundColor: 'transparent',
		borderRadius: '25px',
		marginTop: theme.spacing(3),
		"&:hover": 
		{
			color: 'black',
			backgroundColor: 'white'
		}
	}
});

const theme = createMuiTheme({
	typography:
	{
		allVariants:
		{
			fontFamily: `"Andika New Basic", sans-serif`,
			color: 'white'
		},
		subtitle1:
		{
			marginTop: '10px',
			lineHeight: 1.2
		}
	}
});

function Admin(props) {
    
	const { classes } = props;
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [open, setOpen] = useState(false);
	console.log('====================================');
	console.log(firebase.getCurrentUsername());
	console.log('====================================');

	if (firebase.getCurrentUsername())
	{
		props.history.replace('/dashboard');
		return null;
	}

	const Alert = (props) =>
    {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
	}
	
	const closeSnackbar = () =>
	{
		setOpen(false);
	}

	return (
		<main className={classes.main}>
			<Paper className={classes.paper}>
				<form onSubmit={e => e.preventDefault() && false}>
					<FormControl margin="normal" required fullWidth>
						<Input 
							className={classes.input}
							disableUnderline
							id="email" name="email" 
							placeholder="כתובת אימייל"
							autoComplete="off" 
							autoFocus 
							value={email} 
							onChange={e => setEmail(e.target.value)}
							startAdornment=
							{<InputAdornment style={{marginLeft: "13px"}} position="start">
								<AlternateEmailIcon />
							</InputAdornment>} />
					</FormControl>
					<FormControl margin="normal" required fullWidth>
						<Input 
							className={classes.input}
							disableUnderline
							name="password" id="password"
							placeholder="סיסמה"
							type="password" 
							autoComplete="off" 
							value={password} 
							onChange={e => setPassword(e.target.value)}
							startAdornment=
							{<InputAdornment style={{marginLeft: "13px"}} position="start">
								<LockOutlinedIcon />
							</InputAdornment>} />
					</FormControl>
					<Button
						type="submit"
						onClick={login}
						className={classes.submit}>
						כניסה
          			</Button>
				</form>
			</Paper>
			<Snackbar open={open} autoHideDuration={3500} onClose={closeSnackbar}>
                <Alert onClose={closeSnackbar} severity="error">
					<MuiThemeProvider theme={theme}>
						<Typography align="center" variant="subtitle2">
							{error}
						</Typography>
					</MuiThemeProvider>
                </Alert>
            </Snackbar>
		</main>
	)

    async function login() 
	{
		try 
		{
			await firebase.login(email, password);
            props.history.replace('/dashboard');
		} 
		catch(error) 
		{
			setOpen(true);
			setError(error.message);
		}
	}
}

export default withRouter(withStyles(styles)(Admin));