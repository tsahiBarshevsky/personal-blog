import React, { useState, useEffect } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import firebase from '../firebase';
import { Typography } from '@material-ui/core';
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
    const [fault, setFault] = useState(false);
    const title = props.match.params.title;
    const image = "https://firebasestorage.googleapis.com/v0/b/tsahis-website.appspot.com/o/Backgrounds%2FIMG_0561_Easy-Resize.com.jpg?alt=media&token=f6d4acc4-f5ea-41c1-b018-e3829afeac08";
    const background = {background: `url(${post.mainImageLink}) fixed center center`};

    useEffect(() => {
        firebase.db.collection("posts").doc(title).get().then(function(doc)
        {
            if (doc.exists)
                setPost(doc.data());
            else
                setFault(true);
        });
        document.addEventListener('contextmenu', (e) => 
        {
            e.preventDefault();
        });
    }, []);

    const renderPost = () =>
    {
        var paragraphs = post.text.split("\n");
        var i = 0;
        console.log(paragraphs);
        return (paragraphs.map((paragraph, index) =>
            <div key={index}>
                {paragraph !== "" ? 
                    <div className="paragraphs">
                        <p>{paragraph}</p>
                        <br />    
                    </div>
                : 
                    <div className="paragraphs">
                        <img src={post.images[0]} style={{ width: 500 }} />
                        <br />
                    </div>}
            </div>
            /*<div key={index}>
                <p>{paragraph}</p>
                <br />
                {index % 2 !== 0 ?
                    <div className="paragraphs">
                        {`img\n`}
                    </div>
                : null}
            </div>
            <div>
                {paragraph !== "" ?
                    <div index={index} className="paragraphs">
                        <p>{paragraph}</p>
                        <br />
                        {index % 2 !== 0 ?
                            <img src={post.images[0]} style={{ width: 500 }} />
                        : null}
                    </div> 
                : '\n' }
            </div>*/
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
            </div>
            <div className="top-line">
                <img src={image} alt="Profile image" className="rounded"/>
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
                    {Object.keys(post).length > 0 ? renderPost() : "null"}
                </p>
            </div>
        </div>
    )
}