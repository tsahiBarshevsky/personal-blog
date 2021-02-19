import React from 'react';
import { Typography } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
	typography:
	{
		allVariants:
		{
			fontFamily: `"Varela Round", sans-serif`,
		},
        caption:
        {
            fontWeight: 600
        },
        h4:
        {
            paddingTop: 8
        }
	}
});

export default function Card(props) {
    return (
        <div className="card-container">
            <img src={props.mainImageLink} alt="Main image" className="image"/>
            <div className="image-container">
                <div className="category-container">
                    <MuiThemeProvider theme={theme}>
                        <Typography variant="caption">
                            {props.category}
                        </Typography>
                    </MuiThemeProvider>
                </div>
            </div>
            <MuiThemeProvider theme={theme}>
                <Typography variant="h4" gutterBottom>
                    {props.title}
                </Typography>
            </MuiThemeProvider>
            <p className="subtitle">{`${props.subtitle.slice(0, 70)}...`}</p>
        </div>
    )
}
