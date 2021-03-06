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
        caption:
        {
            transform: 'translateY(10%)'
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

export default function MediumCard(props) 
{
    const title = props.title;
    const titleLink = props.title.replace(/\s+/g, '-');
    const titleCheck = 'כותרת-עם-רווחים';
    const titleCheck2 = titleCheck.replace('-', /\s+/g);
    const subtitle = props.subtitle;
    const date = props.date;
    const category = props.category;
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

    return (
        <div className="medium-card-container" style={background}>
            <div className="black">
                {category !== undefined ?
                <div className="category">
                    <MuiThemeProvider theme={theme}>
                        <Typography variant="overline">
                            {category}
                        </Typography>
                    </MuiThemeProvider>
                </div> : null}
                <Link className="link" to={{pathname: `/${titleLink}`}}>
                    <MuiThemeProvider theme={theme}>
                        <Typography variant="h6">
                            {title}
                        </Typography>
                    </MuiThemeProvider>
                </Link>
                {subtitle ? 
                <p className="subtitle">
                    {subtitle.length >= 105 ? `${subtitle.slice(0, 105)}...` : subtitle}
                </p>
                : null}
                <div className="date-and-comments">
                    <div className="date">
                        <EventOutlinedIcon className="icon" />
                        <MuiThemeProvider theme={theme}>
                            <Typography variant="caption">
                                {formatDate(new Date(date.seconds * 1000))}
                            </Typography>
                        </MuiThemeProvider>
                    </div>
                    <div className="comments">
                        <AiOutlineComment className="icon" />
                        <MuiThemeProvider theme={theme}>
                            <Typography variant="caption">
                                {comments.length}
                            </Typography>
                        </MuiThemeProvider>
                    </div>
                </div>
            </div>
        </div>
    )
}
