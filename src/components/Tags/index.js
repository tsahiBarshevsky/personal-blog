import React, { useState, useEffect } from 'react';
import MediumCard from '../Cards/medium';
import firebase from '../firebase';
// import BackToTop from '../Back To Top Button';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Helmet } from 'react-helmet';

const theme = createMuiTheme({
	typography:
	{
        h5:
        {
            fontFamily: `"Varela Round", sans-serif`,
            marginRight: 10,
        }
	}
});

function Tags(props) 
{
    const [posts, setPosts] = useState([]);
    const tag = props.match.params.tag;

    useEffect(() => {
        firebase.getAllPostsByTags(tag).then(setPosts);
    }, [])

    return (
        <div className="category-and-tag-page-container">
            {/* <BackToTop showBelow={110} /> */}
            <Helmet><title>פוסטים עם תגית {tag} | האיש והמילה הכתיבה</title></Helmet>
            <div className="title">
                <MuiThemeProvider theme={theme}>
                    <Typography variant="h5">פוסטים המכילים את התיוג {tag}</Typography>
                </MuiThemeProvider>
            </div>
            <div className="posts-container">
                {posts.sort((a,b) => (a.date < b.date) ? 1 : ((b.date < a.date) ? -1 : 0))
                .map((post, index) => 
                    <div className="cards" key={index}>
                        <MediumCard 
                            title={post.title} 
                            subtitle={post.subtitle}
                            category={post.category}
                            date={post.date} 
                            comments={post.comments} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Tags;
