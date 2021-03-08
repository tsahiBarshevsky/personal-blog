import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Card from '../Card';
import firebase from '../firebase';
import Hero from '../Hero';
import About from '../About';
import Footer from '../Footer';
import { Helmet } from 'react-helmet';
import Navbar from '../Navbar';

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
            for (var i=0; i<sorted.length; i++) //sorted.length should be 9 when done!
                if (new Date(sorted[i].date.seconds * 1000) <= new Date().setHours(0, 0, 0, 0))
                    ret.push(<Card mainImageLink={sorted[i].mainImageLink}
                            category={sorted[i].category}
                            title={sorted[i].title}
                            subtitle={sorted[i].subtitle}
                            date={sorted[i].date} />);
            return <div className="posts">{ret}</div>
        }
    }

    return (
        <div className="home-container">
            <Helmet><title>האיש והמילה הכתובה</title></Helmet>
            {/* <Navbar /> */}
            <Hero />
            <About />
            <div className="posts-container" id="posts">
                <MuiThemeProvider theme={theme}>
                    <Typography variant="h4">פוסטים אחרונים</Typography>
                </MuiThemeProvider>
                {/* {posts.length > 0 ? 
                    <Card title={posts[0].title}
                        subtitle={posts[0].subtitle}
                        date={posts[0].date} /> 
                : null} */}
                {renderLastPosts()}
            </div>
            <Footer />
        </div>
    )
}
