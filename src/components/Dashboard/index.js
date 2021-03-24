import React, { useState, useEffect } from 'react';
import firebase from '../firebase';
import { withRouter } from 'react-router-dom';
import { Button, Typography, DialogActions, Snackbar, Grid, IconButton } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import WarningIcon from '@material-ui/icons/Warning';
import { withStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import Navbar from './navbar';
import { blueGrey, green } from '@material-ui/core/colors';
import { Bars, useLoading } from '@agney/react-loading';
import DataTable, { createTheme } from 'react-data-table-component';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { Bar } from '@reactchartjs/react-chart.js'

const styles = theme => ({
    button:
    {
        color: 'white',
        width: 122,
        height: 40,
        fontSize: 16,
        backgroundColor: green[500],
        borderRadius: 15,
        marginLeft: 10,
        transition: 'all 0.5s ease-out',
        '&:hover':
		{
			backgroundColor: green[300]
		}
    },
    iconButton:
    {
        color: 'white',
        width: 40,
        height: 40,
        fontSize: 16,
        backgroundColor: blueGrey[600],
        margin: 5,
        transition: 'all 0.5s ease-out',
        '&:hover':
		{
			backgroundColor: blueGrey[400]
		}
    },
    cancel:
	{
		color: '#263238',
		width: 85,
		height: 40,
		fontSize: 16,
        fontWeight: 600,
		border: '2px solid #263238',
		backgroundColor: 'transparent',
		borderRadius: 25,
		transition: 'all 0.2s ease-out',
		'&:hover':
		{
			color: 'white',
			backgroundColor: '#263238',
			transition: 'all 0.2s ease-in'
		}
	},
	delete: 
	{
		width: 85,
		color: 'white',
		fontSize: 16,
		fontWeight: 600,
		border: '2px solid #263238',
		backgroundColor: '#263238',
		borderRadius: 25,
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
		allVariants: { fontFamily: `"Varela Round", sans-serif` },
        h4: { textAlign: 'center', fontSize: 20 },
        h5: { fontWeight: 600, letterSpacing: 2, paddingBottom: 20 },
        h6: { textDecoration: 'underline', paddingBottom: 15 },
        subtitle1: { fontWeight: 'bold' },
        subtitle2: { fontSize: 15 },
        body1: { marginBottom: 10 },
        caption: { fontSize: 18 }
	}
});

const typographyTheme = createMuiTheme({
	typography:
	{
        subtitle2:
        {   
            fontFamily: `"Varela Round", sans-serif`,
            fontSize: 18,
            color: '#159753',
            fontWeight: 600,
            paddingTop: 10
        }
	}
});

createTheme('solarized', 
{
    background: {
        default: '#f5f5f5',
    }
});



function Dashboard(props) 
{
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [update, setUpdate] = useState(true);
    const [open, setOpen] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [success, setSuccess] = useState('');
    const [months, setMonths] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const { indicatorEl } = useLoading({
        loading: true,
        indicator: <Bars width="50" className="loading" />,
    });
    const { classes } = props;
    const dialogBackground = {backgroundColor: '#f5f5f5'};
    const warningStyle = {
        fontSize: 30,
        color: '#263238',
        marginLeft: 10,
    }

    const data = {
        labels: ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'],
        datasets: 
        [{
            label: 'פוסטים פר חודש',
            data: months.map(a => a.amount),
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1,
        },],
    }
      
    const options = {
        scales: { yAxes: [{ ticks: { beginAtZero: true, },},], },
    }

    useEffect(() => {
        if (update)
        {
            //firebase.getAllPostsWithConvertedDate().then(setPosts);
            getAllPosts();
            firebase.getPostsPerMonths().then(setMonths);
            setUpdate(false);
            console.log("bdika");
            console.log(posts);
        }
    }, [getAllPosts, firebase.getPostsPerMonths()]);

    if (!firebase.getCurrentUsername()) {
		props.history.replace('/admin');
		return null;
	}

    if (posts && !loaded)
        setTimeout(() => { setLoaded(true); }, 1000);

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

    const countCategories = (iterable) => 
    {
        return new Set(iterable.map(a => a.category)).size;
	}

    const findTopCategory = (array) =>
    {
        var categories = [];
        array.map((element) =>
        {
            categories.push(element.category);
        })
        if (categories.length === 0)
            return "אין";
        var modeMap = {};
        var maxCategory = categories[0], maxOccurrences = 1;
        for (var i = 0; i < categories.length; i++)
        {
            var el = categories[i];
            if (modeMap[el] == null)
                modeMap[el] = 1;
            else
                modeMap[el]++;  
            if (modeMap[el] > maxOccurrences)
            {
                maxCategory = el;
                maxOccurrences = modeMap[el];
            }
        }
        return (
            <div style={{lineHeight: 1.2}}>
                {`${maxCategory}`}
            </div>
        )
    }

    const findFruitfulMonth = () =>
    {
        var max = months.reduce((p, c) => p.amount > c.amount ? p : c);
        return `${max.month} - ${max.amount}`; 
    }

    // Posts table columns
    const columns = [
        {
            name: <h2>שם הפוסט</h2>,
            selector: 'title',
            sortable: true,
        },
        {
            name: <h2>תאריך</h2>,
            selector: 'date',
            sortable: true,
        },
        {
            name: <h2>קטגוריה</h2>,
            selector: 'category',
            sortable: true,
        },
        {
            name: <h2>מספר תגובות</h2>,
            selector: 'comments',
            sortable: true,
        },
        {
            name: <h2>אפשרויות</h2>,
            selector: 'buttons',
            sortable: true,
        },
    ];

    return (
        <>
            {loaded ? 
            <>
                <Navbar />
                <div className="dashboard-container">
                    <Helmet><title>{`האיש והמילה הכתובה | לוח בקרה`}</title></Helmet>
                    <MuiThemeProvider theme={theme}>
                        <Typography variant="h5">לוח הבקרה</Typography>
                        <Typography variant="h6" gutterBottom>סטטיסטיקות</Typography>
                    </MuiThemeProvider>
                    <div className="statistics-holder">
                        <div className="cards">
                            <div className="statistics-container">
                                <div className="content">
                                    <MuiThemeProvider theme={theme}>
                                        <Typography variant="h4">{posts.length}</Typography>
                                    </MuiThemeProvider>
                                    <MuiThemeProvider theme={theme}>
                                        <Typography variant="subtitle1">כמות פוסטים</Typography>
                                    </MuiThemeProvider>
                                </div>
                            </div>
                            <div className="statistics-container">
                                <div className="content">
                                    <MuiThemeProvider theme={theme}>
                                        <Typography variant="h4">{countCategories(posts)}</Typography>
                                    </MuiThemeProvider>
                                    <MuiThemeProvider theme={theme}>
                                        <Typography variant="subtitle1">כמות קטגוריות</Typography>
                                    </MuiThemeProvider>
                                </div>
                            </div>
                            <div className="statistics-container">
                                <div className="content">
                                    <MuiThemeProvider theme={theme}>
                                        <Typography variant="h4">{findTopCategory(posts)}</Typography>
                                    </MuiThemeProvider>
                                    <MuiThemeProvider theme={theme}>
                                        <Typography variant="subtitle1">הקטגוריה המובילה</Typography>
                                    </MuiThemeProvider>
                                </div>
                            </div>
                            <div className="statistics-container">
                                <div className="content">
                                    <MuiThemeProvider theme={theme}>
                                        <Typography variant="h4">{months? findFruitfulMonth(posts): null}</Typography>
                                    </MuiThemeProvider>
                                    <MuiThemeProvider theme={theme}>
                                        <Typography variant="subtitle1">החודש הפורה ביותר</Typography>
                                    </MuiThemeProvider>
                                </div>
                            </div>
                        </div>
                        <Bar data={data} options={options} height={100} />
                    </div>
                    <hr />
                    <MuiThemeProvider theme={theme}>
                        <Typography variant="h6" gutterBottom>פוסטים</Typography>
                    </MuiThemeProvider>
                    <div className="buttons-container">
                        <Button to="/editor"
                            component={Link} 
                            variant="contained"
                            className={classes.button}>פוסט חדש</Button>
                        <Button to="/newsletter"
                            component={Link} 
                            variant="contained"
                            className={classes.button}>ערוך ניוזלטר</Button>
                    </div>
                    <div className="table-container">
                        <DataTable
                            title="רשימת פוסטים"
                            columns={columns}
                            data={posts}
                            pagination
                            direction="rtl"
                            pointerOnHover
                            theme="solarized"
                        />
                    </div>
                    <hr />
                    <MuiThemeProvider theme={theme}>
                        <Typography variant="h6" gutterBottom>פעולות נוספות</Typography>
                    </MuiThemeProvider>
                    <div className="buttons-container">
                        <Button to="/"
                            component={Link} 
                            variant="contained"
                            className={classes.button}>לדף הבית</Button>
                        <Button 
                            variant="contained"
                            className={classes.button}
                            onClick={logout}>התנתק</Button>
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
                                    <Typography variant="caption" gutterBottom>
                                        {`רגע, בטוח שאתה רוצה למחוק את הפוסט ${title}?`}
                                    </Typography>
                                </MuiThemeProvider>
                            </DialogContent>
                            <DialogActions style={dialogBackground}>
                                <Button onClick={handleClose} className={classes.delete}>ביטול</Button>
                                <Button onClick={deletePost} className={classes.cancel}>מחיקה</Button>
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
            </>
            :
            <div className="full-container">
                {indicatorEl}
                <MuiThemeProvider theme={typographyTheme}>
                    <Typography align="center" variant="subtitle2">
                        רק רגע...
                    </Typography>
                </MuiThemeProvider>
            </div>}
        </>
    )

    async function getAllPosts()
    {
        var arr = [];
        firebase.db.collection("posts").get().then((querySnapshot) =>
        {
            querySnapshot.forEach((doc) => {
                arr.push({
                    title: doc.data().title, 
                    date: new Date(doc.data().date.seconds * 1000).toLocaleDateString("en-GB"), 
                    category: doc.data().category,
                    comments: doc.data().comments.length,
                    buttons: 
                        <div>
                            <IconButton component={Link}
                                to={{pathname: `/${doc.data().title.replace(/\s+/g, '-')}`}} 
                                className={classes.iconButton}
                                variant="contained"><VisibilityOutlinedIcon /></IconButton>
                            <IconButton component={Link}
                                to={{pathname: `/edit/${doc.data().title.replace(/\s+/g, '-')}`}}
                                className={classes.iconButton} 
                                variant="contained"><EditOutlinedIcon /></IconButton>
                            <IconButton 
                                variant="contained" 
                                className={classes.iconButton}
                                onClick={() => {setTitle(doc.data().title); handleOpen();}}><DeleteOutlinedIcon /></IconButton>
                        </div>});
            });
            if (arr.length > 0)
                setPosts(arr);
        });
    }

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