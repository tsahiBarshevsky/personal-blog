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
    //const [posts, setPosts] = useState([]);
    const [sixRecentPosts, setSixRecentPosts] = useState([])
    const [categories, setCategories] = useState([]);
    const [postsByCategories, setPostsByCategories] = useState([]);

    useEffect(() =>
    {
        //firebase.getAllPosts().then(setPosts);
        firebase.getSixRecentPosts().then(setSixRecentPosts);
        firebase.categoriesDistribution().then(setCategories);
        firebase.getAllPostsByCategory().then(setPostsByCategories);
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
            <About /> 
            <Hero /> */}
              <div className="blog-card">
    <div className="meta">
      <div className="photo" style={{backgroundImage: `url(https://storage.googleapis.com/chydlx/codepen/blog-cards/image-1.jpg)`}}></div>
      <ul className="details">
        <li className="author"><a href="#">John Doe</a></li>
        <li className="date">Aug. 24, 2015</li>
        <li className="tags">
          <ul>
            <li><a href="#">Learn</a></li>
            <li><a href="#">Code</a></li>
            <li><a href="#">HTML</a></li>
            <li><a href="#">CSS</a></li>
          </ul>
        </li>
      </ul>
    </div>
    <div className="description">
      <h1>Learning to Code</h1>
      <h2>Opening a door to the future</h2>
      <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eum dolorum architecto obcaecati enim dicta praesentium, quam nobis! Neque ad aliquam facilis numquam. Veritatis, sit.</p>
      <p className="read-more">
        <a href="#">Read More</a>
      </p>
    </div>
  </div>
  <div className="blog-card alt">
    <div className="meta">
      <div className="photo" style={{backgroundImage: `url(https://storage.googleapis.com/chydlx/codepen/blog-cards/image-2.jpg)`}}></div>
      <ul className="details">
        <li className="author"><a href="#">Jane Doe</a></li>
        <li className="date">July. 15, 2015</li>
        <li className="tags">
          <ul>
            <li><a href="#">Learn</a></li>
            <li><a href="#">Code</a></li>
            <li><a href="#">JavaScript</a></li>
          </ul>
        </li>
      </ul>
    </div>
    <div className="description">
      <h1>Mastering the Language</h1>
      <h2>Java is not the same as JavaScript</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eum dolorum architecto obcaecati enim dicta praesentium, quam nobis! Neque ad aliquam facilis numquam. Veritatis, sit.</p>
      <p className="read-more">
        <a href="#">Read More</a>
      </p>
    </div>
  </div>
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
                    <div className="title">
                        <MuiThemeProvider theme={theme}>
                            <Typography variant="body1">אהבה</Typography>
                        </MuiThemeProvider>
                    </div>
                    {/*{postsByCategories.map((post, index) =>
                        <div key={index}>
                            <SmallCard
                                title={post.title}
                                subtitle={post.subtitle}
                                date={post.date} />
                        </div>
                    )} */}
                </Grid>
                <Grid item lg={2} xl={10}>
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
