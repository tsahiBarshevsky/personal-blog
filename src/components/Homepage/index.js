import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import ScrollContainer from 'react-indiana-drag-scroll';
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
        },
        body1:
        {
            marginRight: 10,
            fontSize: 18
        }
	}
});

export default function Homepage() 
{
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() =>
    {
        firebase.getNineRecentPosts().then(setPosts);
        firebase.categoriesDistribution().then(setCategories);
    }, []);

    // const renderLastPosts = () =>
    // {
    //     var sorted = posts.sort((a,b) => (a.date < b.date) ? 1 : ((b.date < a.date) ? -1 : 0));
    //     var ret = [];
    //     if (sorted.length > 0)
    //     {
    //         for (var i=0; i<sorted.length; i++) //sorted.length should be 9 when done!
    //             if (new Date(sorted[i].date.seconds * 1000) <= new Date().setHours(0, 0, 0, 0))
    //                 ret.push(<Card mainImageLink={sorted[i].mainImageLink}
    //                         category={sorted[i].category}
    //                         title={sorted[i].title}
    //                         subtitle={sorted[i].subtitle}
    //                         date={sorted[i].date} />);
    //         return <ScrollContainer vertical className="posts">{ret}</ScrollContainer>
    //     }
    // }

    return (
        <div className="home-container">
            <Helmet><title>האיש והמילה הכתובה</title></Helmet>
            {/* <Navbar />
            <About /> */}
            <Hero />
            <div className="posts-container" id="posts">
                <MuiThemeProvider theme={theme}>
                    <Typography variant="h4">פוסטים אחרונים</Typography>
                </MuiThemeProvider>
                <ScrollContainer className="posts">
                    {posts.map((post, index) =>
                        <div key={index}>
                            {index}
                            <Card mainImageLink={post.mainImageLink}
                                category={post.category}
                                title={post.title}
                                subtitle={post.subtitle}
                                date={post.date} />
                        </div>
                    )}
                </ScrollContainer>
            </div>
            <div className="top-categories-container">
                <div className="title">
                    <MuiThemeProvider theme={theme}>
                        <Typography variant="body1">קטגוריות מובילות</Typography>
                    </MuiThemeProvider>
                </div>
                {categories.map((category, index) =>
                    <div className="category-container" key={index}>
                        <MuiThemeProvider theme={theme}>
                            <Typography variant="subtitle1">{category.category}</Typography>
                            <Typography variant="subtitle1">{category.occurrences}</Typography>
                        </MuiThemeProvider>
                    </div>
                )}
            </div>
            {/* <Footer /> */}
        </div>
    )
}
