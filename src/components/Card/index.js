import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
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
            fontWeight: 600,
            letterSpacing: 1
        },
        h4:
        {
            paddingTop: 8
        }
	}
});

export default function Card(props) 
{
    const title = props.title;
    const subtitle = props.subtitle;
    const category = props.category;
    const [url, setUrl] = useState('');
   
    useEffect(() => {
        firebase.storage.ref(`posts/${title}/main/main image`).getDownloadURL().then(
            url => {setUrl(url);}
        );
    }, []);

    return (
        <Link className="card-container" to={{pathname: `/${title}`}}>
            <img src={url} alt="תמונה ראשית" className="image"/>
            <div className="image-container">
                <div className="category-container">
                    <MuiThemeProvider theme={theme}>
                        <Typography variant="caption">
                            {category}
                        </Typography>
                    </MuiThemeProvider>
                </div>
            </div>
            <MuiThemeProvider theme={theme}>
                <Typography variant="h4" gutterBottom>
                    {title}
                </Typography>
            </MuiThemeProvider>
            {subtitle ? 
            <p className="subtitle">
                {subtitle.length >= 80 ? `${subtitle.slice(0, 80)}...` : subtitle}
            </p>
            : null }
        </Link>
    )
}
