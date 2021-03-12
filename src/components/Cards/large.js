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
            transform: 'translateY(-210%)',
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
    const background = { backgroundImage: `url(${url})` };

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
      <div className="large-card-container">
        <div className="meta">
          <div className="photo" style={background} />
          <div className="details">
            <EventOutlinedIcon className="icon" />
            <MuiThemeProvider theme={theme}>
                <Typography variant="subtitle1">
                    {formatDate(new Date(date.seconds * 1000))}
                </Typography>
            </MuiThemeProvider>
          </div>
        </div>
        <div className="description">
          <Link className="link" to={{pathname: `/${title}`}}>
            <MuiThemeProvider theme={theme}>
              <Typography variant="h5">
                    {title}
                </Typography>
            </MuiThemeProvider>
          </Link>
          <p>{subtitle}</p>
        </div>
      </div>
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