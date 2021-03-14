import React, { useState, useEffect } from 'react';
import MediumCard from '../Cards/medium';
import firebase from '../firebase';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

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

export default function Category(props) 
{
    const [posts, setPosts] = useState([]);
    const category = props.match.params.category;

    useEffect(() => {
        firebase.getAllPostsByCategory(category).then(setPosts);
    }, []);

    return (
        <div className="category-page-container">
            <div className="title">
                <MuiThemeProvider theme={theme}>
                    <Typography variant="h5">פוסטים בקטגוריה {category}</Typography>
                </MuiThemeProvider>
            </div>
            <div className="posts-container">
                {posts.sort((a,b) => (a.date < b.date) ? 1 : ((b.date < a.date) ? -1 : 0))
                .map((post, index) => 
                    <div className="cards" key={index}>
                        <MediumCard title={post.title} subtitle={post.subtitle} date={post.date} comments={post.comments} />
                    </div>
                )}
            </div>
        </div>
    )
}
