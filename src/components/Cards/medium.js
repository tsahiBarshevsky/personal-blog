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

export default function MediumCard(props) 
{
    const title = props.title;
    const subtitle = props.subtitle;
    const date = props.date;
    const category = props.category;
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
        <div className="card-container" style={background}>
            <div className="black">
                <div className="category">
                    <MuiThemeProvider theme={theme}>
                        <Typography variant="overline">
                            {category}
                        </Typography>
                    </MuiThemeProvider>
                </div>
                <Link className="link" to={{pathname: `/${title}`}}>
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
                <div className="date">
                    <EventOutlinedIcon className="icon" />
                    <MuiThemeProvider theme={theme}>
                        <Typography variant="caption">
                            {formatDate(new Date(date.seconds * 1000))}
                        </Typography>
                    </MuiThemeProvider>
                </div>
            </div>
        </div>
        // <Link className="card-container" to={{pathname: `/${title}`}}>
        //     <img src={url} alt="תמונה ראשית" className="image"/>
        //     <div className="image-container">
        //         <div className="category-container">
        //             <MuiThemeProvider theme={theme}>
        //                 <Typography variant="caption">
        //                     {category}
        //                 </Typography>
        //             </MuiThemeProvider>
        //         </div>
        //     </div>
        //     <MuiThemeProvider theme={theme}>
        //         <Typography variant="h5" gutterBottom>
        //             {title}
        //         </Typography>
        //     </MuiThemeProvider>
        //     {subtitle ? 
        //     <p className="subtitle">
        //         {subtitle.length >= 75 ? `${subtitle.slice(0, 75)}...` : subtitle}
        //     </p>
        //     : null }
        // </Link>
    )
}
