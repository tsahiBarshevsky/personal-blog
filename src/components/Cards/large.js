import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import EventOutlinedIcon from '@material-ui/icons/EventOutlined';
import { Link } from 'react-router-dom';
import firebase from '../firebase';

const theme = createMuiTheme({
	typography:
	{
		allVariants:
		{
			fontFamily: `"Varela Round", sans-serif`,
		},
        caption:
        {
            transform: 'translateY(10%)'
            // fontWeight: 600,
            // letterSpacing: 1
        },
        h5:
        {
            paddingTop: 8,
            '@media (max-width: 400px)':
			{
				fontSize: 20,
                fontWeight: 600
			}
        }
	}
});

export default function LargeCard(props) 
{
    const title = props.title;
    const subtitle = props.subtitle;
    const date = props.date;
    //const category = props.category;
    const [url, setUrl] = useState('');
    const background = { background: `url(${url})` };

    useEffect(() => {
        firebase.storage.ref(`posts/${title}/main/main image`).getDownloadURL().then(
            url => {setUrl(url);}
        );
    }, []);

    const formatDate = (date) =>
    {
        var day = date.toLocaleString('he', {day: '2-digit'});
        var month = date.toLocaleString('he', {month: 'long'});
        var year = date.toLocaleString('he', {year: 'numeric'});
        return `${day} ב${month}, ${year}`;
    }

    return (
        <>
              <div className="blog-card">
    <div className="meta">
      <div className="photo" style="background-image: url(https://storage.googleapis.com/chydlx/codepen/blog-cards/image-1.jpg)"></div>
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
      <div className="photo" style="background-image: url(https://storage.googleapis.com/chydlx/codepen/blog-cards/image-2.jpg)"></div>
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
        </>
        // <div classNameNameName="large-card-container">
        //     <div classNameNameName="background" style={background} />
        //     <div classNameNameName="content">
        //         <Link classNameNameName="link" to={{pathname: `/${title}`}}>
        //             <MuiThemeProvider theme={theme}>
        //                 <Typography variant="h6">
        //                     {title}
        //                 </Typography>
        //             </MuiThemeProvider>
        //         </Link>
        //         <p classNameNameName="subtitle">{subtitle}</p>
        //         <div classNameNameName="date">
        //             <EventOutlinedIcon classNameNameName="icon" />
        //             <MuiThemeProvider theme={theme}>
        //                 <Typography variant="caption">
        //                     {formatDate(new Date(date.seconds * 1000))}
        //                 </Typography>
        //             </MuiThemeProvider>
        //         </div>
        //     </div>
        // </div>
    )
}