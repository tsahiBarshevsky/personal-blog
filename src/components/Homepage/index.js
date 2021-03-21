import React, { useState, useEffect } from 'react';
import { Typography, Chip, Input, IconButton, InputAdornment, Snackbar } from '@material-ui/core';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import NavigateBeforeRoundedIcon from '@material-ui/icons/NavigateBeforeRounded';
import ScrollContainer from 'react-indiana-drag-scroll';
import { Link } from 'react-router-dom';
import MediumCard from '../Cards/medium';
import firebase from '../firebase';
import Hero from '../Hero';
import About from '../About';
import Footer from '../Footer';
import { Helmet } from 'react-helmet';
import Navbar from '../Navbar';
import LargeCard from '../Cards/large';
import SmallCard from '../Cards/small';
import BackToTop from '../Back To Top Button';
import ScrollToTop from '../scrollToTop';

const styles = (theme) => ({
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
    button:
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
    },
    chip:
    {
        marginLeft: theme.spacing(1),
        marginBottom: theme.spacing(1),
        border: '1px solid #159753',
        cursor: 'pointer'
    }
});

const theme = createMuiTheme({
	typography:
	{
		allVariants: 
        {
			fontFamily: `"Varela Round", sans-serif`,
		},
        h4:
        {
            textDecoration: 'underline',
            letterSpacing: 3,
            paddingBottom: 25
        },
        h5:
        {
            fontFamily: `"Gveret-Levin", sans-serif`,
            width: '80%',
            fontWeight: 500,
            lineHeight: 1.2
        },
        subtitle2:
        {
            fontSize: 15,
            marginBottom: 20,
            lineHeight: 1.2
        },
        body1:
        {
            marginRight: 10,
            fontSize: 18
        }
	}
});

function Homepage(props) 
{
    const [posts, setPosts] = useState([]);
    const [sixRecentPosts, setSixRecentPosts] = useState([])
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [email, setEmail] = useState('');
    const [open, setOpen] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    // const [postsByCategories, setPostsByCategories] = useState([]);
    // const image = "https://firebasestorage.googleapis.com/v0/b/tsahis-website.appspot.com/o/Backgrounds%2FIMG_0561_Easy-Resize.com.jpg?alt=media&token=f6d4acc4-f5ea-41c1-b018-e3829afeac08";
    const { classes } = props;

    useEffect(() =>
    {
        firebase.getAllPosts().then(setPosts);
        firebase.getSixRecentPosts().then(setSixRecentPosts);
        firebase.categoriesDistribution().then(setCategories);
        firebase.tagsDistribution().then(setTags);
    }, []);

    function renderPostsByCategory(category)
    {
        var arr = [], counter = 0;
        var sorted = posts.sort((a,b) => (a.date < b.date) ? 1 : ((b.date < a.date) ? -1 : 0));
        for (var i=0; i<posts.length; i++) 
        {
            if (sorted[i].category === category)
            {
                arr.push(<LargeCard key={i} title={sorted[i].title} subtitle={sorted[i].subtitle} date={sorted[i].date} comments={sorted[i].comments} />);
                counter++;
            }
            if (counter === 3)
                break;
        }
        return (
            <div>
                <div className="title">
                    <MuiThemeProvider theme={theme}>
                        <Typography variant="body1">{category}</Typography>
                        {counter === 3 ?
                        <Link className="link" to={{pathname: `/categories/${category}`}}>
                            <Typography variant="body2">עוד ב{category}</Typography>
                        </Link> : null}
                    </MuiThemeProvider>
                </div>
                <div style={{paddingBottom: 25}}>{arr}</div>
            </div>
        )
    }

    const renderTags = () =>
    {
        var ret = [];
        tags.map((tag) => 
            ret.push(
                <Chip component={Link} to={`tags/${tag.tag}`} variant="outlined" 
                    className={classes.chip} size="small" label={tag.tag} />));
        return (<div className="tags-container">{ret}</div>);
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
        <div className="home-container">
            <Helmet><title>האיש והמילה הכתובה</title></Helmet>
            <ScrollToTop />
            <BackToTop showBelow={110} />
            <Navbar />
            <Hero />
            <div className="main-content">
                <div className="posts-container" id="posts">
                    <div className="title">
                        <MuiThemeProvider theme={theme}>
                            <Typography variant="body1">פוסטים אחרונים</Typography>
                        </MuiThemeProvider>
                    </div>
                    <ScrollContainer className="posts">
                        {sixRecentPosts.map((post, index) =>
                            <div key={index}>
                                <MediumCard
                                    category={post.category}
                                    title={post.title}
                                    subtitle={post.subtitle}
                                    date={post.date}
                                    comments={post.comments} />
                            </div>
                        )}
                    </ScrollContainer>
                </div>
                <div className="newsletter-container">
                    <MuiThemeProvider theme={theme}>
                        <Typography variant="h5" gutterBottom>הירשם כמנוי כדי לקבל מייל עדכון שבועי</Typography>
                        <Typography variant="subtitle2">רק פעם אחת בשבוע וניתן להסיר את הרישום בכל עת</Typography>
                    </MuiThemeProvider>
                    <div className="newsletter-textfield">
                        <Input className={classes.input} 
                            value={email}
                            type="email"
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
                <div className="categories-and-tags">
                    <div className="posts-by-categories">
                        {categories.map((category, index) =>
                            <div key={index}>
                                {renderPostsByCategory(category.category)}
                            </div>
                        )}
                    </div>
                    <div className="distributions">
                        <div className="top-categories-container">
                            <div className="title">
                                <MuiThemeProvider theme={theme}>
                                    <Typography variant="body1">קטגוריות מובילות</Typography>
                                </MuiThemeProvider>
                            </div>
                            {categories.map((category, index) =>
                                <div className="category-container" key={index}>
                                    <MuiThemeProvider theme={theme}>
                                        <Link style={{textDecoration: 'none', color: 'black'}} to={{pathname: `/categories/${category.category}`}}>
                                            <Typography variant="subtitle1">{category.category}</Typography>
                                        </Link>
                                        <Typography variant="subtitle1">{category.occurrences}</Typography>
                                    </MuiThemeProvider>
                                </div>
                            )}
                        </div>
                        <div className="top-tags-container">
                            <div className="title">
                                <MuiThemeProvider theme={theme}>
                                    <Typography variant="body1">תגיות מומלצות</Typography>
                                </MuiThemeProvider>
                            </div>
                            {renderTags()}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
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

export default withStyles(styles)(Homepage);