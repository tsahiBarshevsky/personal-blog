import React, { useState, useEffect } from 'react';
import { withStyles, createMuiTheme, MuiThemeProvider, StylesProvider, jssPreset } from '@material-ui/core/styles';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints';
import { Bars, useLoading } from '@agney/react-loading';
import firebase from '../firebase';
import { Grid, Typography, Box, Button, Avatar, Divider, FormControl, TextField, Snackbar, IconButton } from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import MuiAlert from '@material-ui/lab/Alert';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import CommentIcon from '@material-ui/icons/Comment';
import SubdirectoryArrowLeftRoundedIcon from '@material-ui/icons/SubdirectoryArrowLeftRounded';
import rtl from 'jss-rtl';
import { create } from 'jss';
import ScrollToTop from '../scrollToTop';
import SmallCard from '../Cards/small';
import q1 from '../../images/q1.png';
import q2 from '../../images/q2.png';
import BackToTop from '../Back To Top Button';
import Navbar from '../Navbar';
import Footer from '../Footer';

const breakpoints = createBreakpoints({});
const theme = createMuiTheme({
	typography:
	{
		allVariants:
		{
			fontFamily: `"Varela Round", sans-serif`,
		},
        body1:
        {
            zIndex: 2,
            fontWeight: 600,
            [breakpoints.down("md")]:
            {
                lineHeight: 1.2
            }
        },
        body2:
        {
            fontSize: 16,
            lineHeight: 1.2,
            marginTop: 10
        },
        h3:
        {
            [breakpoints.down("xs")]:
            {
                fontSize: 40
            }
        },
        h4:
        {
            fontSize: 15
        },
        h5:
        {
            marginBottom: 15
        },
        h6:
        {
            letterSpacing: 2,
            fontWeight: 600
        },
        caption:
        {
            fontWeight: 600
        },
        overline:
        {
            color: red[900],
            transform: 'translateY(-15%)'
        },
        subtitle2:
        {   
            fontSize: 18,
            color: '#159753',
            fontWeight: 600,
            paddingTop: 10
        }
	},
    direction: "rtl",
    palette: { primary: green}
});

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const styles = (theme) => ({
    button:
    {
        color: '#159753',
        width: 165,
        height: 45,
        fontSize: 17,
        backgroundColor: 'transparent',
        border: '2px solid #159753',
        borderRadius: 25,
        transition: 'all 0.4s ease-out',
        marginTop: 30,
        '&:hover':
		{
            color: 'white',
			backgroundColor: green[500]
		}
    },
    commentButton:
    {
        color: '#159753',
        width: 140,
        height: 40,
        fontSize: 17,
        backgroundColor: 'transparent',
        border: '2px solid #159753',
        borderRadius: 25,
        transition: 'all 0.4s ease-out',
        marginTop: 10,
        '&:hover':
		{
            color: 'white',
			backgroundColor: '#159753'
		}
    },
    avatar:
    {
        width: theme.spacing(6),
        height: theme.spacing(6),
        marginLeft: theme.spacing(1.5)
    },
    divider:
    {
        marginBottom: 5,
        borderRadius: 5
    },
    aboveCommmetDivider:
    {
        height: 2,
        width: '100%',
        backgroundColor: 'black',
        margin: '5px 0',
        borderRadius: 5
    },
    aboutDivider:
    {
        height: 4,
        width: 150,
        backgroundColor: '#159753',
        margin: 15,
        borderRadius: 5
    },
    input:
    {
        width: 500,
        [theme.breakpoints.down("xs")]:
        {
            width: 250
        }
    },
    snackbar:
    {
        textAlign: 'center'
    }
});

function Post(props) 
{
    const [post, setPost] = useState('');
    const [images, setImages] = useState([]);
    const [url, setUrl] = useState('');
    const [recentPosts, setRecentPosts] = useState([]);
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');
    const [loaded, setLoaded] = useState(false);
    const [fault, setFault] = useState(false);
    const [open, setOpen] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const title = props.match.params.title.replaceAll('-', ' ');
    const image = 'https://firebasestorage.googleapis.com/v0/b/personal-blog-a2e4f.appspot.com/o/images%2Fabout-rounded.jpg?alt=media&token=206a498a-98c0-40ba-bb00-48da4ffa5789';
    const { classes } = props;
    const background = {
        backgroundImage: `url(${url})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed'};
    const { indicatorEl } = useLoading({
        loading: true,
        indicator: <Bars width="50" className="loading" />,
    });

    useEffect(() => 
    {
        // get post values
        firebase.getPost(title).then(setPost);

        // get post main image
        firebase.storage.ref(`posts/${title}/main/main image`).getDownloadURL().then(
            url => {setUrl(url);}
        );
        
        //get post images' links
        const storageRef = firebase.storage.ref();
        storageRef.child(`posts/${title}`).listAll()
        .then((res) => {
            res.items.map((itemRef) => {
                itemRef.getDownloadURL().then(function(url)
                {
                    itemRef.getMetadata()
                    .then((metadata) =>
                    {
                        setImages(oldImages => [...oldImages, {link: url, owner: metadata.customMetadata.owner}]);
                    })
                    .catch((error) => 
                    {
                        console.log(error.message);
                    })
                });
            });
        }).catch((error) => {
            console.log(error.message);
        });

        // get 3 recent posts
        firebase.getRecentPosts(title).then(setRecentPosts);

        // disable right click 
        if (!firebase.getCurrentUsername())
            document.addEventListener('contextmenu', (e) => 
            {
                e.preventDefault();
            });
    }, []);

    if (post === null && !fault)
        setTimeout(() => { setFault(true); }, 1000); 

    if (post && !loaded)
        setTimeout(() => { setLoaded(true); }, 1000);

    const Alert = (props) =>
    {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const renderPost = () =>
    {
        var paragraphs = post.text.split("\n");
        if (post.category === 'שירים')
        {
            const songStyle = {
                justifyContent: 'flex-stat', 
                alignItems: 'flex-start',
                
            };
            return (
                <p className="post" style={songStyle}>
                    {paragraphs.map((paragraph, index) =>
                    <div key={index}>
                        {paragraph !== '' ?
                            <div className="song-paragraphs">
                                <p>{paragraph}</p>
                            </div>
                        :
                            <br />
                        }
                    </div>
                    )}
                </p>
            );
        }
        var i = 0, j = 0;
        return (
            <p className="post">
                {paragraphs.map((paragraph, index) =>
                <div key={index}>
                    {paragraph !== "" ? 
                        <div className="paragraphs">
                            <p>{paragraph}</p>
                            <br />    
                        </div>
                    : 
                        <div className="paragraphs">
                            {Object.keys(images).length >= 1 ?
                            <>
                                <img src={images[i++].link} alt="תמונה" className="image" />
                                <MuiThemeProvider theme={theme}>
                                    <Typography variant="caption">
                                        {`קרדיט: ${images[j++].owner}`}
                                    </Typography>
                                </MuiThemeProvider>
                                <br />
                            </> : null }
                        </div>
                    }
                </div>
                )}
            </p>
        );
    }

    const formatDate = (date) =>
    {
        var days = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];
        var week = days[date.getDay()];
        var day = date.toLocaleString('he', {day: '2-digit'});
        var month = date.toLocaleString('he', {month: 'long'});
        var year = date.toLocaleString('he', {year: 'numeric'});
        return `יום ${week} ${day} ב${month}, ${year}`;
    }

    const formatComments = (amount) =>
    {
        var kind = post.category === 'שירים' ? 'שיר' : 'פוסט';
        switch(amount)
        {
            case 0: 
                return `ל${kind} זה אין תגובות`;
            case 1:
                return `ל${kind} זה יש תגובה אחת`;
            default:
                return `ל${kind} זה יש ${amount} תגובות`;
        }
    }

    const handleOpen = () => 
    {
        setOpen(true);
    }
    
    const handleClose = () => 
    {
        setOpen(false);
        setOpenError(false);
    }

    return (
        
        <div className="root"
            style={!firebase.getCurrentUsername() ?
            { userSelect: 'none' } : {}}>
            {loaded ? 
                <>
                    <ScrollToTop />
                    <BackToTop showBelow={110} />
                    <Helmet><title>{`${title} | האיש והמילה הכתובה`}</title></Helmet>
                    <Navbar />
                    <div className="post-header" style={background}>
                        <div className="subtitle-container">
                            <div className="right-quotation-marks-container">
                                <img src={q1} className="quotation-marks" />
                            </div>
                            <div className="left-quotation-marks-container">
                                <img src={q2} className="quotation-marks"/>
                            </div>
                            <MuiThemeProvider theme={theme}>
                                <Typography variant="body1">
                                    {post.subtitle}
                                </Typography>
                            </MuiThemeProvider>
                        </div>
                    </div>
                    <Grid container direction="row" justify="flex-start" alignItems="flex-start">
                        <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                            <div className="content">
                                <div className="information">
                                    <MuiThemeProvider theme={theme}>
                                        <Typography variant="h3" align="center">
                                            {post.title}
                                        </Typography>
                                        <hr />
                                        {Object.keys(post).length > 0 ?
                                        <Typography variant="subtitle1" align="center">
                                            {formatDate(new Date(post.date.seconds * 1000))}
                                        </Typography> : "oops"}
                                    </MuiThemeProvider>
                                </div>
                                {Object.keys(post).length > 0 ? renderPost() : null}
                                {/* <p className="post">
                                    {Object.keys(post).length > 0 ? renderPost() : null}
                                </p> */}
                                <div className="main-credit-and-tags">
                                    <div className="credit-container">
                                        <MuiThemeProvider theme={theme}>
                                            <Typography variant="body1">
                                                {`קרדיט לתמונה ראשית: ${post.credit}`}
                                            </Typography>
                                        </MuiThemeProvider>
                                    </div>
                                    <div className="tags-container">
                                        <MuiThemeProvider theme={theme}>
                                            <Typography variant="body1">תגיות: </Typography>
                                        </MuiThemeProvider>
                                        {post.tags.map((tag) => <Link className="tag-link" to={`/tags/${tag}`}>{tag}</Link>)}
                                    </div>
                                    <Divider className={classes.aboveCommmetDivider}/>
                                </div>
                                <div className="comments">
                                    <MuiThemeProvider theme={theme}>
                                        <Typography variant="h5">
                                            {formatComments(post.comments.length)}
                                        </Typography>
                                    </MuiThemeProvider>
                                    {post.comments.map((comment, index) =>
                                        <div key={index} className="comment-root">
                                            <div className="comment-container">
                                                {comment.name === 'צחי - האיש והמילה הכתובה' && comment.admin ? 
                                                    <div className="avatars">
                                                        <SubdirectoryArrowLeftRoundedIcon style={{color: 'black'}} />
                                                        <Avatar className={classes.avatar} src={image} />
                                                    </div>
                                                :
                                                    <Avatar className={classes.avatar} /> }
                                                <div className="comment">
                                                    <div>
                                                        <MuiThemeProvider theme={theme}>
                                                            <Typography variant="body1" gutterBottom>
                                                                {comment.name}
                                                            </Typography>
                                                            <Typography variant="body2" gutterBottom>
                                                                {comment.comment}
                                                            </Typography>
                                                        </MuiThemeProvider>
                                                    </div>
                                                </div>
                                                {firebase.getCurrentUsername() ? 
                                                <div className="buttons">
                                                    <IconButton aria-label="delete" size="small" onClick={() => deleteComment(index)}>
                                                        <DeleteForeverRoundedIcon className="delete-icon" />
                                                    </IconButton>
                                                    <IconButton aria-label="comment" size="small" onClick={() => addAdminComment(index)}>
                                                        <CommentIcon className="comment-icon" />
                                                    </IconButton>  
                                                </div>
                                                : null}
                                            </div>
                                            <Divider className={classes.divider} />
                                        </div>
                                    )}
                                    <MuiThemeProvider theme={theme}>
                                        <Typography variant="h5">כתיבת תגובה חדשה</Typography>
                                    </MuiThemeProvider>
                                    <StylesProvider jss={jss}>
                                        <MuiThemeProvider theme={theme}>
                                            <FormControl margin="normal" fullWidth>
                                                <TextField label="שם" required
                                                    id="name" name="name"
                                                    variant="outlined"
                                                    autoComplete="off" 
                                                    value={name}
                                                    onChange={e => setName(e.target.value)}
                                                    className={classes.input} />
                                            </FormControl>
                                            <FormControl margin="normal" fullWidth>
                                                <TextField label="התגובה שלך" required
                                                    id="comment" name="comment"
                                                    variant="outlined"
                                                    multiline
                                                    autoComplete="off" 
                                                    value={comment} 
                                                    onChange={e => setComment(e.target.value)}
                                                    inputProps={{maxLength: 500}}
                                                    className={classes.input} />
                                            </FormControl>
                                        </MuiThemeProvider>
                                        {500 - comment.length <= 10 && comment.length !== 500 ? 
                                        <MuiThemeProvider theme={theme}>
                                            <Typography variant="overline">
                                                {`${500-comment.length} תווים נשארו עד ל-500`}
                                            </Typography>
                                        </MuiThemeProvider>
                                        :
                                        [(comment.length === 500 ? 
                                        <MuiThemeProvider theme={theme}>
                                            <Typography variant="overline">
                                                {`הגעת לכמות התווים המקסימלית`}
                                            </Typography>
                                        </MuiThemeProvider>	
                                        : null)]}
                                    </StylesProvider>
                                    <Button className={classes.commentButton} onClick={addComment}>הוסף תגובה</Button>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} className="about">
                            <Link to="/about" className="link">
                                <img src={image} alt="פדיחה! אמורה להיות תמונה שלי כאן :(" className="profile-image"/>
                            </Link>
                            <Divider className={classes.aboutDivider} />
                            <div className="about-text">
                                <MuiThemeProvider theme={theme}>
                                    <Typography align="center" variant="body1">
                                        צחי "האיש והמילה הכתובה" ברשבסקי. היפי בהסוואה, כותב את מה שהלב צועק ואיש אינו שומע, רודף אחרי שקיעות ומוצא בהן השראה. בואו למצוא אותי בין השורות.
                                    </Typography>
                                </MuiThemeProvider>
                            </div>
                            <div className="recent-posts">
                                <MuiThemeProvider theme={theme}>
                                    <Typography align="center" variant="h6" gutterBottom>
                                        פוסטים אחרונים
                                    </Typography>
                                </MuiThemeProvider>
                                {recentPosts.map((post, index) =>
                                    <div key={index}>
                                        <SmallCard title={post.title} />
                                    </div>
                                )}
                            </div>
                        </Grid>
                    </Grid>
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
                                <Typography variant="h4" align="center">{snackbarMessage}</Typography>
                            </MuiThemeProvider>}
                    />
                    <Snackbar open={openError} autoHideDuration={3500} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="error">
                            <MuiThemeProvider theme={theme}>
                                <Typography align="center" variant="h4">
                                    {snackbarMessage}
                                </Typography>
                            </MuiThemeProvider>
                        </Alert>
                    </Snackbar>
                </>
            :
            [(!fault ?
                <div className="full-container">
                    {indicatorEl}
                    <MuiThemeProvider theme={theme}>
                        <Typography align="center" variant="subtitle2">
                            רק רגע...
                        </Typography>
                    </MuiThemeProvider>
                </div>
                :
                <div className="full-overflow-container">
                    <Helmet><title>{`האיש והמילה הכתובה | שגיאה`}</title></Helmet>
                    <div className="recent-posts">
                        <MuiThemeProvider theme={theme}>
                            <Typography align="center" variant="h5">
                                {`עדיין אין לי פוסט בשם ${title} 😉 בינתיים הנה כמה מהפוסטים האחרונים שלי:`}
                            </Typography>
                        </MuiThemeProvider>
                        {recentPosts.map((post, index) =>
                            <>
                                <div key={index}>
                                    <SmallCard title={post.title} />
                                </div>
                                <Box component="span" display="block" pb={2} />
                            </>
                        )}
                        <Button component={Link}
                            to="/" variant="contained"
                            className={classes.button}>חזרה לדף הבית</Button>
                    </div>
                </div>
            )]}
        </div>
    )

    async function addComment()
    {
        if (name.trim() && comment.trim())
        {
            const commentObject = {name: name, comment: comment, admin: false};
            try 
            {
                await firebase.addComment(title, commentObject);
                setSnackbarMessage('התגובה נוספה ובקרוב תוצג בפוסט!');
                handleOpen();
                setName('');
                setComment('');
            } 
            catch (error) 
            {
                console.log(error.message);
                setSnackbarMessage('קרתה שגיאה, נסה שנית');
                setOpenError(true);
                setName('');
                setComment('');
            }
        }
        else
        {
            setSnackbarMessage('התגובה שלך ריקה!');
            setOpenError(true);
        }
    }

    async function addAdminComment(index)
    {
        const commentObject = {name: name, comment: comment, admin: true};
        try 
        {
            await firebase.addAdminComment(title, index+1, commentObject);
            setSnackbarMessage('התגובה נוספה ובקרוב תוצג בפוסט!');
            handleOpen();
            setName('');
            setComment('');
        } 
        catch (error) 
        {
            console.log(error.message);
            setSnackbarMessage('קרתה שגיאה, נסה שנית');
            setOpenError(true);
            setName('');
            setComment('');
        }
    }

    function deleteComment(index)
    {
        var commentObject = post.comments[index];
        try
        {
            firebase.deleteComment(title, commentObject);
            setSnackbarMessage('התגובה נמחקה בהצלחה');
            handleOpen();
        }
        catch (error)
        {
            console.log(error.message);
            setSnackbarMessage('קרתה שגיאה, נסה שנית');
            setOpenError(true);
        }
    }
}

export default withStyles(styles)(Post);