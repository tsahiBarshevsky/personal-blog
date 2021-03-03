import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Card from '../Card';
import firebase from '../firebase';
import Hero from '../Hero';
import Footer from '../Footer';
import { Helmet } from 'react-helmet';

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

    const renderLastPosts = () =>
    {
        var sorted = posts.sort((a,b) => (a.date < b.date) ? 1 : ((b.date < a.date) ? -1 : 0));
        var ret = [];
        if (sorted.length > 0)
        {
            for (var i=0; i<sorted.length; i++)
                ret.push(<Card mainImageLink={sorted[i].mainImageLink}
                        category={sorted[i].category}
                        title={sorted[i].title}
                        subtitle={sorted[i].subtitle} />);
            return <div className="posts">{ret}</div>
        }
    }

    return (
        <>
            <Helmet><title>האיש והמילה הכתובה</title></Helmet>
            <Hero />
            <div className="posts-container">
                <MuiThemeProvider theme={theme}>
                    <Typography variant="h4">פוסטים אחרונים</Typography>
                </MuiThemeProvider>
                {renderLastPosts()}
            </div>
            <Footer />
        </>
    )
}
