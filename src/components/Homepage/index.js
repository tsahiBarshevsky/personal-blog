import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Card from '../Card';
import firebase from '../firebase';
import Hero from '../Hero';

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
        }
	}
});

export default function Homepage() 
{
    const [posts, setPosts] = useState([]);

    useEffect(() =>
    {
        firebase.getAllPosts().then(setPosts);
    }, []);

    return (
        <>
            <Hero />
            <div className="posts-container">
                <MuiThemeProvider theme={theme}>
                    <Typography variant="h4">פוסטים אחרונים</Typography>
                </MuiThemeProvider>
                <div className="posts">
                    {posts.map((post, index) =>
                        <div index={index}>
                            <Card mainImageLink={post.mainImageLink}
                                category={post.category}
                                title={post.title}
                                subtitle={post.subtitle} />
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
