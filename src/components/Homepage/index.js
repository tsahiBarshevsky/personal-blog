import React, { useState, useEffect } from 'react';
import { Typography, Chip, Input, IconButton, InputAdornment, Snackbar } from '@material-ui/core';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import NavigateBeforeRoundedIcon from '@material-ui/icons/NavigateBeforeRounded';
import ScrollContainer from 'react-indiana-drag-scroll';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { GiWorld } from 'react-icons/gi';
import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.min.css";
import MediumCard from '../Cards/medium';
import firebase from '../firebase';
import Hero from '../Hero';
import Footer from '../Footer';
import { Helmet } from 'react-helmet';
import Navbar from '../Navbar';
import LargeCard from '../Cards/large';
import BackToTop from '../Back To Top Button';
import ScrollToTop from '../scrollToTop';
import { Bars, useLoading } from '@agney/react-loading';

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

const aboutTheme = createMuiTheme({
    typography:
    {
        allVariants: 
        {
			fontFamily: `"Varela Round", sans-serif`,
		},
        subtitle1:
        {
            fontWeight: 600,
            marginBottom: 2
        },
        subtitle2: 
        { 
            fontSize: 15,
            lineHeight: 1.2
        }
    }
});

const loadingTheme = createMuiTheme({
	typography:
	{
		allVariants:
		{
			fontFamily: `"Varela Round", sans-serif`,
		},
        subtitle2:
        {   
            fontSize: 18,
            color: '#159753',
            fontWeight: 600,
            paddingTop: 10
        }
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
            lineHeight: 1.4
        },
        h6: 
        {
            fontWeight: 600,
            marginRight: 10,
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
    const [loaded, setLoaded] = useState(false);
    const [email, setEmail] = useState('');
    const [open, setOpen] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const { indicatorEl } = useLoading({
        loading: true,
        indicator: <Bars width="50" className="loading" />,
    });
    const image = 'https://firebasestorage.googleapis.com/v0/b/personal-blog-a2e4f.appspot.com/o/images%2Fabout-rounded.jpg?alt=media&token=206a498a-98c0-40ba-bb00-48da4ffa5789';
    const { classes } = props;

    useEffect(() =>
    {
        firebase.getAllPosts().then(setPosts);
        firebase.getSixRecentPosts().then(setSixRecentPosts);
        firebase.categoriesDistribution('homepage').then(setCategories);
        firebase.tagsDistribution().then(setTags);
    }, []);

    if (posts && sixRecentPosts && categories && tags && !loaded)
        setTimeout(() => { setLoaded(true) }, 1500);

    function renderPostsByCategory(category)
    {
        var arr = [], counter = 0;
        var sorted = posts.sort((a,b) => (a.date < b.date) ? 1 : ((b.date < a.date) ? -1 : 0));
        for (var i=0; i<posts.length; i++) 
        {
            if (sorted[i].category === category && new Date(sorted[i].date.seconds * 1000) <= new Date().setHours(23, 59, 59, 59))
            {
                arr.push(<LargeCard key={i} title={sorted[i].title} subtitle={sorted[i].subtitle} date={sorted[i].date} comments={sorted[i].comments} />);
                counter++;
            }
            if (counter === 3)
                break;
        }
        return (
            <ScrollAnimation animateIn="animate__backInDown" animateOnce>
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
            </ScrollAnimation>
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
        <>
            {loaded ? 
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
                                <Typography variant="h6">פוסטים אחרונים</Typography>
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
                            <Typography variant="h5" gutterBottom>יש לי גם ניוזלטר! הירשמו כמנוי וקבלו מייל עדכון שבועי</Typography>
                            <Typography variant="subtitle2">התחרטתם? תוכלו <Link className="link" to='/unsubscribe'>לבטל את המינוי</Link> בכל עת</Typography>
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
                    <div className="title" style={{marginBottom: 20}}>
                        <MuiThemeProvider theme={theme}>
                            <Typography variant="h6">פוסטים נוספים</Typography>
                        </MuiThemeProvider>
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
                            <div className="about">
                                <img src={image} alt="פדיחה! אמורה להיות תמונה שלי כאן :("/>
                                <MuiThemeProvider theme={aboutTheme}>
                                    <Typography variant="subtitle1">צחי ברשבסקי</Typography>
                                    <div className="socials-container">
                                        <div className="social-item">
                                            <a href="https://www.facebook.com/tsahi.barshavsky/" target="_blank">
                                                <FaFacebookF className="icon" id="facebook" />
                                            </a>
                                        </div>
                                        <div className="social-item">
                                            <a href="https://www.instagram.com/tsahi_barshavsky/" target="_blank">
                                                <FaInstagram className="icon" id="instagram" />
                                            </a>
                                        </div>
                                        <div className="social-item">
                                            <a href="https://www.thebloggers.co.il/author/tsahib/" target="_blank">
                                                <GiWorld className="icon" id="blog" />
                                            </a>
                                        </div>
                                    </div>
                                    <Typography variant="subtitle2">
                                        היפי בהסוואה, כותב את מה שהלב צועק ואיש אינו שומע, רודף אחרי שקיעות ומוצא בהן השראה. בואו למצוא אותי בין השורות.
                                    </Typography>
                                </MuiThemeProvider>
                            </div>
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
            : 
            <div className="full-container">
                {indicatorEl}
                <MuiThemeProvider theme={loadingTheme}>
                    <Typography align="center" variant="subtitle2">
                        רק רגע...
                    </Typography>
                </MuiThemeProvider>
            </div>}
        </>
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