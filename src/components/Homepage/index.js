import React, { useState, useEffect } from 'react';
import { Typography, Grid } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import ScrollContainer from 'react-indiana-drag-scroll';
import MediumCard from '../Cards/medium';
import firebase from '../firebase';
import Hero from '../Hero';
import About from '../About';
import Footer from '../Footer';
import { Helmet } from 'react-helmet';
import Navbar from '../Navbar';
import LargeCard from '../Cards/large';
import SmallCard from '../Cards/small';

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
    const [sixRecentPosts, setSixRecentPosts] = useState([])
    const [categories, setCategories] = useState([]);
    const [postsByCategories, setPostsByCategories] = useState([]);

    useEffect(() =>
    {
        firebase.getAllPosts().then(setPosts);
        firebase.getSixRecentPosts().then(setSixRecentPosts);
        firebase.categoriesDistribution().then(setCategories);
        //firebase.getAllPostsByCategory("אהבה").then(setPostsByCategories);
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

    function renderPostsByCategory(category)
    {
      var arr = [], counter = 0;;
      for (var i=0; i<posts.length; i++) 
      {
        if (posts[i].category === category)
        {
          arr.push(<LargeCard key={i} title={posts[i].title} subtitle={posts[i].subtitle} date={posts[i].date} />);
          counter++;
        }
        if (counter === 3)
          break;
      }
      return <div style={{paddingBottom: 25}}>{arr}</div>
    }

    return (
        <div className="home-container">
            <Helmet><title>האיש והמילה הכתובה</title></Helmet>
            {/* <Navbar />
            <About /> 
            <Hero /> */}
            <div className="posts-container" id="posts">
                <div className="title">
                    <MuiThemeProvider theme={theme}>
                        <Typography variant="body1">פוסטים אחרונים</Typography>
                    </MuiThemeProvider>
                </div>
                <ScrollContainer className="posts">
                    {sixRecentPosts.map((post, index) =>
                        <div key={index}>
                            <MediumCard
                                category={post.category}
                                title={post.title}
                                subtitle={post.subtitle}
                                date={post.date} />
                        </div>
                    )}
                </ScrollContainer>
            </div>
            <Grid container direction="row" justify="center" alignItems="baseline">
                <Grid item lg={10} xl={10} className="posts-by-categories">
                  {categories.map((category, index) =>
                    <div key={index}>
                      <div className="title">
                        <MuiThemeProvider theme={theme}>
                            <Typography variant="body1">{category.category}</Typography>
                        </MuiThemeProvider>
                      </div>
                      {renderPostsByCategory(category.category)}
                    </div>
                  )}

                    
                    {/* {postsByCategories.sort((a,b) => (a.date < b.date) ? 1 : ((b.date < a.date) ? -1 : 0)).map((post, index) =>
                      <div key={index}>
                        <LargeCard
                            title={post.title}
                            subtitle={post.subtitle}
                            date={post.date} />
                      </div>
                    )} */}
                </Grid>
                <Grid item lg={2} xl={2}>
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
                </Grid>
            </Grid>
            {/* <Footer /> */}
        </div>
    )
}
