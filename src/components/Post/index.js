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
    const [images, setImages] = useState([]);
    console.log(images);
    const [fault, setFault] = useState(false);
    const title = props.match.params.title;
    const image = "https://firebasestorage.googleapis.com/v0/b/tsahis-website.appspot.com/o/Backgrounds%2FIMG_0561_Easy-Resize.com.jpg?alt=media&token=f6d4acc4-f5ea-41c1-b018-e3829afeac08";
    const background = {background: `url(${post.mainImageLink}) fixed center center`};

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
        
        //get post images' links
        const storageRef = firebase.storage.ref();
        storageRef.child(`posts/${title}`).listAll()
        .then((res) => {
            res.items.forEach((itemRef) => {
                itemRef.getDownloadURL().then(url => images.push(url));
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
        //var paragraphs = post.text.split("\n");
        var paragraphs = ["p1", "p2", "", "p3", "p4", "", "p5", "p6"];
        var img = ["img1", "img2", "img3"];
        var i = 0;
        return (paragraphs.map((paragraph, index) =>
            <div key={index}>
                {paragraph !== "" ? 
                    <div className="paragraphs">
                        <p>{paragraph}</p>
                        <br />    
                    </div>
                : 
                    <div className="paragraphs">
                        {/*<p>{img[i++]}</p>*/}
                        <img src={images[i++]} style={{ width: 500 }} />
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
