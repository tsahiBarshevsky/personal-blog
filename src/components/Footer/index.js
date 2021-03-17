import React from 'react';
import { Grid, TextField, Button, Typography } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
	typography:
	{
		allVariants: { fontFamily: `"Varela Round", sans-serif` },
        body1: { lineHeight: 1.25 },
        subtitle1: { lineHeight: 1.25 },
        h6: { marginRight: 10 },
        body2: { marginBottom: 5 }
	}
});

export default function Footer() 
{
    return (
        <footer>
            <div className="polygon" />
            <div className="information">
                <Grid spacing={2} container direction="row" justify="center" alignItems="flex-start">
                    <Grid item>
                        <div className="about-me">
                            <MuiThemeProvider theme={theme}>
                                <div className="title"><Typography variant="h6">קצת עליי</Typography></div>
                                <Typography variant="body1">
                                    צחי "האיש והמילה הכתובה" ברשבסקי. היפי בהסוואה, כותב את מה שהלב צועק ואיש אינו שומע, רודף אחרי שקיעות ומוצא בהן השראה. בואו למצוא אותי בין השורות.
                                </Typography>
                            </MuiThemeProvider>
                        </div>
                    </Grid>
                    <Grid item>
                        <div className="newsletter">
                            <MuiThemeProvider theme={theme}>
                                <div className="title"><Typography variant="h6">ניוזלטר</Typography></div>
                                <Typography variant="subtitle1">הישארו מעודכנים בפוסטים האחרונים שלי, מבטיח לא להציק יותר מדי :)</Typography>
                            </MuiThemeProvider>
                            <div className="newsletter-textfield">
                                <TextField />
                                <Button>קדימה</Button>
                            </div>
                        </div>
                    </Grid>
                    <Grid item>
                        <div className="socials">
                            <MuiThemeProvider theme={theme}>
                                <div className="title"><Typography variant="h6">בואו נשמור על קשר?</Typography></div>
                                <Typography variant="subtitle1">תוכלו למצוא אותי גם כאן</Typography>
                            </MuiThemeProvider>
                        </div>
                    </Grid>
                </Grid>
            </div>
            <div className="copyright">
                <MuiThemeProvider theme={theme}>
                    <Typography variant="body2">
                        האיש והמילה הכתובה &bull; כל הזכויות שמורות &copy; {new Date().getFullYear()}
                    </Typography>
                </MuiThemeProvider>
            </div>
        </footer>
        // <section className="footer-container">
        //     <div className="footer-content">
        //         <div className="text">
        //             <Typography variant="subtitle1">
        //                 האיש והמילה הכתובה &bull; כל הזכויות שמורות &copy; {new Date().getFullYear()}
        //             </Typography>
        //         </div>
        //     </div>
        //     {/*<svg className="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        //         <path fill="#f5f5f5" fill-opacity="1" d="M0,128L48,128C96,128,192,128,288,128C384,128,480,128,576,112C672,96,768,64,864,48C960,32,1056,32,1152,37.3C1248,43,1344,53,1392,58.7L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
        //     </svg>
        //     <svg className="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        //         <path fill="#f5f5f5" fill-opacity="1" d="M0,96L48,101.3C96,107,192,117,288,128C384,139,480,149,576,133.3C672,117,768,75,864,74.7C960,75,1056,117,1152,128C1248,139,1344,117,1392,106.7L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
        //     </svg>*/}
        //     <svg className="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        //         <path fill="#f5f5f5" fill-opacity="1" d="M0,128L80,149.3C160,171,320,213,480,213.3C640,213,800,171,960,154.7C1120,139,1280,149,1360,154.7L1440,160L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
        //     </svg>
        // </section>
    )
}
