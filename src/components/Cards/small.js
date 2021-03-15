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
        body1:
        {
            marginTop: 5
        }
	}
});

export default function SmallCard(props) 
{
    const title = props.title;
    const [url, setUrl] = useState('');

    useEffect(() => {
        firebase.storage.ref(`posts/${title}/main/main image`).getDownloadURL().then(
            url => {setUrl(url);}
        );
    }, []);

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
