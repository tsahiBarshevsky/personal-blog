import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import firebase from '../firebase';
import LargeCard from '../Cards/large';
import Navbar from '../Navbar';
import BackToTop from '../Back To Top Button';
import ScrollToTop from '../scrollToTop';
import { Helmet } from 'react-helmet';
import Footer from '../Footer';
import { Bars, useLoading } from '@agney/react-loading';

const theme = createMuiTheme({
	typography:
	{
		allVariants: 
        {
			fontFamily: `"Varela Round", sans-serif`,
		},
        subtitle1:
        {
            fontSize: 15,
        },
        body1:
        {
            marginRight: 10,
            fontSize: 18
        },
        subtitle2:
        {   
            fontSize: 18,
            color: '#159753',
            fontWeight: 600,
            paddingTop: 10
        }
	}
});

export default function Categories() 
{
    const [posts, setPosts] = useState('');
    const [categories, setCategories] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const { indicatorEl } = useLoading({
        loading: true,
        indicator: <Bars width="50" className="loading" />,
    });

    useEffect(() =>
    {
        firebase.getAllPosts().then(setPosts);
        firebase.categoriesDistribution().then(setCategories);
    }, []);

    if (posts && !loaded)
        setTimeout(() => { setLoaded(true); }, 1000);

    function renderPostsByCategory(category)
    {
        var arr = [], counter = 0;
        var sorted = posts.sort((a,b) => (a.date < b.date) ? 1 : ((b.date < a.date) ? -1 : 0));
        for (var i=0; i<posts.length; i++) 
        {
            if (sorted[i].category === category)
            {
                arr.push(
                    <LargeCard key={i} 
                        title={sorted[i].title} 
                        subtitle={sorted[i].subtitle} 
                        date={sorted[i].date} 
                        comments={sorted[i].comments}
                        location="categories" />);
                counter++;
            }
            if (counter === 5)
                break;
        }
        return (
            <>
                <div className="title">
                    <MuiThemeProvider theme={theme}>
                        <Typography variant="body1">{category}</Typography>
                    </MuiThemeProvider>
                </div>
                <div className="cards-container">{arr}</div>
                <div className="read-more">
                    {counter === 3 ?
                    <Link className="link" to={{pathname: `/categories/${category}`}}>
                        <MuiThemeProvider theme={theme}>
                        <Typography variant="subtitle1">לפוסטים נוספים בקטגוריה {category}</Typography>
                        </MuiThemeProvider>
                    </Link> : null}
                </div>
            </>
        )
    }

    return (
        <>
            {loaded ?
            <>
                <Navbar />
                <ScrollToTop />
                <BackToTop showBelow={110} />
                <Helmet><title>קטגוריות | האיש והמילה הכתובה</title></Helmet>
                <div className="container">
                    <div className="posts-container">
                        {categories.map((category, index) =>
                            <div key={index}>
                                {renderPostsByCategory(category.category)}
                            </div>
                        )}
                    </div>
                </div>
                <Footer />
            </>
            : 
            <div className="full-container">
                {indicatorEl}
                <MuiThemeProvider theme={theme}>
                    <Typography align="center" variant="subtitle2">
                        רק רגע...
                    </Typography>
                </MuiThemeProvider>
            </div>}
        </>    
    )
}