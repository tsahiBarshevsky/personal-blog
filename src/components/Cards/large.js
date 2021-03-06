import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import EventOutlinedIcon from '@material-ui/icons/EventOutlined';
import { AiOutlineComment } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import firebase from '../firebase';

const theme = createMuiTheme({
	typography:
	{
		allVariants:
		{
			fontFamily: `"Varela Round", sans-serif`,
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
    const titleLink = props.title.replace(/\s+/g, '-');
    const subtitle = props.subtitle;
    const date = props.date;
    const comments = props.comments;
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

    const formatComments = (amount) =>
    {
        switch(amount)
        {
            case 0: 
                return "אין תגובות";
            case 1:
                return "תגובה אחת";
            default:
                return `${amount} תגובות`;
        }
    }

    return (
      <div className="large-card-container" style={props.location === 'categories' ? { width: '100%', margin: 10 } : {}}>
        <div className="meta">
          <div className="photo" style={background} />
          <div className="details">
            <div className="date-and-comments">
              <div className="date">
              <EventOutlinedIcon className="icon" />
                <MuiThemeProvider theme={theme}>
                    <Typography variant="subtitle1">
                        {formatDate(new Date(date.seconds * 1000))}
                    </Typography>
                </MuiThemeProvider>
              </div>
              <div className="comments">
                <AiOutlineComment className="icon" />
                <MuiThemeProvider theme={theme}>
                  <Typography variant="subtitle1">
                      {formatComments(comments.length)}
                  </Typography>
                </MuiThemeProvider>
              </div>
            </div>
          </div>
        </div>
        <div className="description">
          <Link className="link" to={{pathname: `/${titleLink}`}}>
            <MuiThemeProvider theme={theme}>
              <Typography variant="h5">
                    {title}
                </Typography>
            </MuiThemeProvider>
          </Link>
          <p>{subtitle}</p>
        </div>
      </div>
    )
}