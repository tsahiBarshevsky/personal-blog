import React from 'react';
import { Typography } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Navbar from '../Navbar';
import Footer from '../Footer';

const theme = createMuiTheme({
	typography:
	{
		allVariants: { fontFamily: `"Varela Round", sans-serif` },
        h6: { fontWeight: 600, paddingBottom: 10 },
        body1: { fontSize: 17.5 }
	}
});

export default function About() 
{
    const image = "https://firebasestorage.googleapis.com/v0/b/tsahis-website.appspot.com/o/Backgrounds%2FIMG_0561_Easy-Resize.com.jpg?alt=media&token=f6d4acc4-f5ea-41c1-b018-e3829afeac08";

    return (
        <div className="about-container">
            <Navbar />
            <div className="summary">
                <p>
                    <img src={image} alt="זה אני!" className="image"/>
                    <b>היי! שמי צחי ברשבסקי.</b> <br />
                    אני בן 27, מתגורר במרכז ובפן המקצועי אני בוגר תואר ראשון במדעי המחשב ועוסק בפיתוח ועיצוב אתרים, כך שאת הבלוג הזה תכנתתי, עיצבתי והקמתי מאפס אחרי שחלמתי לא מעט זמן לעשות את זה.
                    בפן האישי, אני אוהב צילום, בישול, מוזיקה ונגינה, ומעל הכל, איך לא - כתיבה. התחלתי לכתוב כשהייתי בן 17 ועם השנים האהבה שלי למילה הכתובה הלכה והתעצמה.
                </p>
            </div>
            <div className="arrow-50">
                <div className="cards-content">
                    <MuiThemeProvider theme={theme}>
                        <Typography variant="h6">על מה אני כותב?</Typography>
                        <Typography variant="body1">
                            בגדול? כמעט על הכל, אבל אם הייתי צריך לציין נושאים ספציפיים, אז אבחר בנושאים שהכי מעסיקים אותי.
                            אהבה, זוגיות ויחסים הם הנושאים שלרוב אני מוצא את עצמי כותב עליהם,
                            העצמה והשראה הם גם נושאים שאני מרבה לכתוב עליהם.
                        </Typography>
                    </MuiThemeProvider>
                </div>
            </div>
            <div className="arrow-75">
                <div className="cards-content">
                    <MuiThemeProvider theme={theme}>
                        <Typography variant="h6">מהו סגנון הכתיבה שלי?</Typography>
                        <Typography variant="body1">
                            הסגנונות האהובים עליי הם שירה ופואמות; מאז שהתחלתי לכתוב ועד היום כתבתי למעלה מ2,300 כאלו. 
                        </Typography>
                    </MuiThemeProvider>
                </div>
            </div>
            <Footer />
        </div>
    )
}