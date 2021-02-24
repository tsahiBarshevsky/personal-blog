import React, { useState, useEffect } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import firebase from '../firebase';
import { Grid, Typography, Divider } from '@material-ui/core';
import { Helmet } from 'react-helmet';

const theme = createMuiTheme({
	typography:
	{
		allVariants:
		{
			fontFamily: `"Varela Round", sans-serif`,
		},
        body1:
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
    const [fault, setFault] = useState(false);
    const title = props.match.params.title;
    const image = "https://firebasestorage.googleapis.com/v0/b/tsahis-website.appspot.com/o/Backgrounds%2FIMG_0561_Easy-Resize.com.jpg?alt=media&token=f6d4acc4-f5ea-41c1-b018-e3829afeac08";
    const background = {background: `url(${url}) fixed center center`};

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
        var downloadURL = '';
        storageRef.child(`posts/${title}`).listAll()
        .then((res) => {
            res.items.forEach((itemRef) => {
                
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
                
                
                /*itemRef.getDownloadURL()
                .then(url => setImages(oldImages => [...oldImages, url]));
                itemRef.getMetadata()
                .then((metadata) =>
                {
                    setCredits(oldCredits => [...oldCredits, metadata.customMetadata.owner]);
                })
                .catch((error) => 
                {
                    console.log(error.message);
                })*/
            });
        }).catch((error) => {
            console.log(error.message);
        });

        // disable right click
        document.addEventListener('contextmenu', (e) => 
        {
            e.preventDefault();
        });
    }, []);

    const renderPost = () =>
    {
        var paragraphs = post.text.split("\n");
        //console.log(paragraphs);
        //var paragraphs = ["p1", "p2", "", "p3", "p4", "", "p5", "p6"];
        var img = ["img1", "img2", "img3"];
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
                            <img src={images[i++].link} style={{ width: 500 }} />
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

    return (
        <div className="root">
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
                    <Grid item lg={8}>
                        <div className="top-line">
                            {/*<img src={image} alt="Profile image" className="rounded"/>*/}
                            <div className="information">
                                <MuiThemeProvider theme={theme}>
                                    <Typography variant="h3">
                                        {post.title}
                                    </Typography>
                                    <hr />
                                    {Object.keys(post).length > 0 ?
                                    <Typography variant="subtitle1">
                                        {new Date(post.date.seconds * 1000).toLocaleDateString("en-GB")}
                                    </Typography> : "oops"}
                                </MuiThemeProvider>
                            </div>
                        </div>
                        <div className="content">
                            <p className="post">
                                {Object.keys(post).length > 0 ? renderPost() : null}
                            </p>
                        </div>
                    </Grid>
                    <Grid item lg={4} className="about">
                        <img src={image} alt="Profile image" className="rounded"/>
                        <hr />
                        <div className="about-text">
                            <MuiThemeProvider theme={theme}>
                                <Typography align="center" variant="body1">
                                    צחי "על מה יש לך לכתוב כל הזמן?!" ברשבסקי. היפי בהסוואה, כותב את מה שהלב צועק ואיש אינו שומע, רודף אחרי שקיעות ומוצא בהן השראה. בואו למצוא אותי בין השורות.
                                </Typography>
                            </MuiThemeProvider>
                        </div>
                    </Grid>
            </Grid>
        </div>
    )
}
