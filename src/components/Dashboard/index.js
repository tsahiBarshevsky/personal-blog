import React, { useState, useEffect } from 'react';
import firebase from '../firebase';
import { withRouter } from 'react-router-dom';
import { Button, Typography, DialogActions, Snackbar } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import WarningIcon from '@material-ui/icons/Warning';
import { withStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';

const styles = theme => ({
    fullToEmpty:
	{
		color: '#263238',
		width: '85px',
		height: '40px',
		fontSize: '16px',
		border: '2px solid #263238',
		backgroundColor: 'transparent',
		borderRadius: '25px',
		textTransform: 'capitalize',
		transition: 'all 0.2s ease-out',
		'&:hover':
		{
			color: 'white',
			backgroundColor: '#263238',
			transition: 'all 0.2s ease-in'
		}
	},
	emptyToFull: 
	{
		width: '85px',
		color: 'white',
		fontSize: '15px',
		fontWeight: '600',
		border: '2px solid #263238',
		backgroundColor: '#263238',
		borderRadius: '25px',
		textTransform: 'capitalize',
		margin: theme.spacing(1),
		'&:hover':
		{
			color: '#263238',
			backgroundColor: 'transparent',
		}
	}
});

const theme = createMuiTheme({
	typography:
	{
		allVariants:
		{
			fontFamily: `"Varela Round", sans-serif`,
		}
	}
});

function Dashboard(props) {

    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [update, setUpdate] = useState(true);
    const [open, setOpen] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [success, setSuccess] = useState('');

    const { classes } = props;
    const dialogBackground = {backgroundColor: '#f5f5f5'};
    const warningStyle = {
        fontSize: 30,
        color: '#263238',
        marginLeft: 10,
    }

    useEffect(() => {
        if (update)
        {
            firebase.getAllPosts().then(setPosts);
            setUpdate(false);
            console.log("bdika");
        }
    }, [firebase.getAllPosts()]);

    if (!firebase.getCurrentUsername()) {
		props.history.replace('/admin');
		return null;
	}

    const Alert = (props) =>
    {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
	}

    const handleOpen = () =>
	{
		setOpen(true);
	}

    const handleClose = () =>
	{
        setOpen(false);
    }

    const closeSnackbar = () =>
	{
		setOpenSuccess(false);
    }

    const renderPosts = () =>
    {
        var sorted = posts.sort((a,b) => (a.date < b.date) ? 1 : ((b.date < a.date) ? -1 : 0));
        return (
            <tbody>
                {sorted.map((post, index) =>
                    <tr index={index}>
                        <td>{index+1}</td>
                        <td>{post.title}</td>
                        <td>{new Date(post.date.seconds * 1000).toLocaleDateString("en-GB")}</td>
                        <td>{post.category}</td>
                        <td>
                            <Button component={Link}to={{pathname: `/${post.title}`}} variant="contained">צפייה</Button>
                            <Button component={Link}to={{pathname: `/edit/${post.title}`}} variant="contained">עריכה</Button>
                            <Button variant="contained" onClick={() => {setTitle(post.title); handleOpen();}}>מחיקה</Button>
                        </td>
                    </tr>
                )}
            </tbody>
        )
    }

    return (
        <div className="dashboard-container">
            <Helmet><title>{`האיש והמילה הכתובה | לוח בקרה`}</title></Helmet>
            <div className="header">
                <MuiThemeProvider theme={theme}>
                    <Typography variant="h4">פוסטים</Typography>
                </MuiThemeProvider>
                <Button to="/editor"
                    component={Link} 
                    variant="contained">פוסט חדש</Button>
                <Button to="/"
                    component={Link} 
                    variant="contained">לדף הבית</Button>
                <Button variant="contained" onClick={logout}>התנתק</Button>
            </div>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>שם הפוסט</th>
                            <th>תאריך</th>
                            <th>קטגוריה</th>
                            <th>אפשרויות</th>
                        </tr>
                    </thead>
                    {renderPosts()}
                </table>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                style={{cursor: "default", borderRadius: '25px'}}>
                    <DialogTitle style={dialogBackground}>
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <WarningIcon style={warningStyle} />
                            <MuiThemeProvider theme={theme}>
                                <Typography component="h1" variant="h5">
                                    {`מחיקת פוסט`}
                                </Typography>
                            </MuiThemeProvider>
                        </div>
                    </DialogTitle>
                    <DialogContent style={dialogBackground}>
                        <MuiThemeProvider theme={theme}>
                            <Typography variant="h6" gutterBottom>
                                {`רגע, בטוח שאתה רוצה למחוק את הפוסט ${title}?`}
                            </Typography>
                        </MuiThemeProvider>
                    </DialogContent>
                    <DialogActions style={dialogBackground}>
                        <Button onClick={handleClose} className={classes.emptyToFull}>ביטול</Button>
                        <Button onClick={deletePost} className={classes.fullToEmpty}>מחיקה</Button>
                    </DialogActions>
            </Dialog>
            <Snackbar open={openSuccess} autoHideDuration={3500} onClose={closeSnackbar}>
				<Alert onClose={closeSnackbar} severity="success">
					<MuiThemeProvider theme={theme}>
						<Typography align="center" variant="subtitle2">
							{success}
						</Typography>
					</MuiThemeProvider>
				</Alert>
			</Snackbar>
        </div>
    )

    async function deletePost()
    {
        setOpen(false);
        await firebase.deletePost(title);
        setUpdate(true);
        setSuccess(`${title} נמחק בהצלחה`);
        setOpenSuccess(true);
    }

    async function logout() 
    {
		await firebase.logout();
		props.history.push('/');
	}
}

export default withRouter(withStyles(styles)(Dashboard));