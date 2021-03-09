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

export default function Hero() 
{
    return (
        <div className="hero-container">
        </div>
        // <section>
        //     <div className="hero-content">
        //         {/*<MuiThemeProvider theme={theme}>
        //             <Typography variant="h2" align="center">
        //                 האיש והמילה הכתובה
        //             </Typography>
        //             <Typography variant="h5">
        //                 בלוג אישי שנכתב מהלב
        //             </Typography>
        //         </MuiThemeProvider>
        //         <div className="fieldtests">
        //             <fieldset>
        //                 <legend>אז מי אני? </legend>
        //                 <div className="text">
        //                     <MuiThemeProvider theme={theme}>
        //                         <Typography variant="body1">
        //                             היי! אני צחי, בן 27 מהמרכז. מתכנת במקצועי וכותב למעלה מעשור כתחביב.
        //                             אז חשבתי לעצמי, למה לא לשלב בין שני העולמות?
        //                             אז למה המילה הכתובה? כבר כמה שנים טובות שאני כותב כל יום
        //                             והכתיבה הפכה להיות חלק מרכזי בחיי.
        //                         </Typography>
        //                     </MuiThemeProvider>
        //                 </div>
        //             </fieldset>
        //             <fieldset>
        //                 <legend>על מה אני כותב? </legend>
        //                 <div className="text">
        //                     <MuiThemeProvider theme={theme}>
        //                         <Typography variant="body1">
        //                             אהבה, השראה, מוטיבציה, החיים עצמם
        //                         </Typography>
        //                     </MuiThemeProvider>
        //                 </div>
        //             </fieldset>
        //         </div>*/}   
        //     </div>
        //     {/*<svg className="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        //         <path fill="#f5f5f5" fill-opacity="1" d="M0,128L40,144C80,160,160,192,240,213.3C320,235,400,245,480,240C560,235,640,213,720,192C800,171,880,149,960,128C1040,107,1120,85,1200,101.3C1280,117,1360,171,1400,197.3L1440,224L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path>
        //     </svg>*/}
        //     <svg className="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        //         <path fill="#f5f5f5" fillOpacity="1" d="M0,256L48,218.7C96,181,192,107,288,80C384,53,480,75,576,122.7C672,171,768,245,864,250.7C960,256,1056,192,1152,165.3C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        //     </svg>
        // </section>
    )
}