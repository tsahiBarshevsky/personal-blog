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
        body1:
        {
            fontSize: 18
        }
	}
});

export default function Hero() {
    return (
        <section>
            <div className="hero-content">
                <MuiThemeProvider theme={theme}>
                    <Typography variant="h2">
                        האיש והמילה הכתובה
                    </Typography>
                </MuiThemeProvider>
                <fieldset>
                    <legend>אז מי אני? </legend>
                    <div className="text">
                        <MuiThemeProvider theme={theme}>
                            <Typography variant="body1">
                                היי! אני צחי, בן 27 מהמרכז. מתכנת במקצועי וכותב למעלה מעשור כתחביב.
                                אז חשבתי לעצמי, למה לא לשלב בין שני העולמות?
                            </Typography>
                        </MuiThemeProvider>
                    </div>
                </fieldset>
            </div>
            <svg className="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="#f5f5f5" fillOpacity="1" d="M0,256L48,218.7C96,181,192,107,288,80C384,53,480,75,576,122.7C672,171,768,245,864,250.7C960,256,1056,192,1152,165.3C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
        </section>
    )
}