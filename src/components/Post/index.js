import React, { useState, useEffect } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints'
import firebase from '../firebase';
import { Grid, Typography } from '@material-ui/core';
import { Helmet } from 'react-helmet';
import ScrollToTop from '../scrollToTop';
import SmallCard from './smallCard';

const breakpoints = createBreakpoints({})
const theme = createMuiTheme({
	typography:
	{
		allVariants:
		{
			fontFamily: `"Varela Round", sans-serif`,
		},
        body1:
        {
            fontWeight: 600,
            [breakpoints.down("md")]:
            {
                lineHeight: 1.2
            }
        },
        h3:
        {
            [breakpoints.down("xs")]:
            {
                fontSize: 40
            }
        },
        h6:
        {
            letterSpacing: 2,
            fontWeight: 600,
            textDecoration: 'underline'
        },
        caption:
        {
            fontWeight: 600
        }
	}
});

export default function Post(props) 
{
    const [post, setPost] = useState({});
    const [images, setImages] = useState([]);
    const [url, setUrl] = useState('');
    const [recentPosts, setRecentPosts] = useState([]);
    const [fault, setFault] = useState(false);
    const title = props.match.params.title;
    const image = "https://firebasestorage.googleapis.com/v0/b/tsahis-website.appspot.com/o/Backgrounds%2FIMG_0561_Easy-Resize.com.jpg?alt=media&token=f6d4acc4-f5ea-41c1-b018-e3829afeac08";
    const background = {background: `url(${url}) fixed center center no-repeat`};

    useEffect(() => 
    {
        // get post values
        firebase.db.collection("posts").doc(title).get().then(function(doc)
        {
            if (doc.exists)
                setPost(doc.data());
            else
                setFault(true);
        });

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
        document.addEventListener('contextmenu', (e) => 
        {
            e.preventDefault();
        });
    }, []);

    const renderPost = () =>
    {
        var paragraphs = post.text.split("\n");
        var i = 0, j = 0;
        return (paragraphs.map((paragraph, index) =>
            <div key={index}>
                {paragraph !== "" ? 
                    <div className="paragraphs">
                        <p>{paragraph}</p>
                        <br />    
                    </div>
                : 
                    <div className="paragraphs">
                        {Object.keys(images).length >= 2 ?
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
        ));
    }

    const formatDate = (date) =>
    {
        var day = date.toLocaleString('he', {day: '2-digit'});
        var month = date.toLocaleString('he', {month: 'long'});
        var year = date.toLocaleString('he', {year: 'numeric'});
        return `${day} ב${month}, ${year}`;
    }

    return (
        <div className="root">
            <ScrollToTop />
            <Helmet><title>{`${title} | האיש והמילה הכתובה`}</title></Helmet>
            <div className="post-header" style={background}>
                <div className="subtitle-container">
                    <MuiThemeProvider theme={theme}>
                        <Typography variant="body1">
                            {post.subtitle}
                        </Typography>
                    </MuiThemeProvider>
                </div>
                {/*<div className="credit-container">
                    <p className="caption">{post.credit}</p>
                </div>*/}
            </div>
            <Grid spacing={2}
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start">
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
                            <p className="post">
                                {Object.keys(post).length > 0 ? renderPost() : null}
                            </p>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} className="about">
                        <img src={image} alt="Profile image" className="profile-image"/>
                        <hr />
                        <div className="about-text">
                            <MuiThemeProvider theme={theme}>
                                <Typography align="center" variant="body1">
                                    צחי "על מה יש לך לכתוב כל הזמן?!" ברשבסקי. היפי בהסוואה, כותב את מה שהלב צועק ואיש אינו שומע, רודף אחרי שקיעות ומוצא בהן השראה. בואו למצוא אותי בין השורות.
                                </Typography>
                            </MuiThemeProvider>
                        </div>
                        <div className="recent-post">
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
        </div>
    )
}
