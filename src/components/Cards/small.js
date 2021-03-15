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

export default function SmallCard(props) 
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
        <Link className="small-card-container" 
            to={{pathname: `/${title}`}}
            target="_blank">
            <img src={url} alt="תמונה ראשית" className="image"/>
            <MuiThemeProvider theme={theme}>
                <Typography variant="body1">
                    {title}
                </Typography>
            </MuiThemeProvider>
        </Link>
    )
}
