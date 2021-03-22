import React from 'react';
import { Divider, Grid, Typography } from '@material-ui/core';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Navbar from '../Navbar';
import Footer from '../Footer';
import BackToTop from '../Back To Top Button';
import ScrollToTop from '../scrollToTop';
import image from '../../images/pexels-pixabay-261510.jpg';
import { Helmet } from 'react-helmet';
import { FaInstagram } from 'react-icons/fa';
import { SiFacebook } from 'react-icons/si';
import { GiWorld } from 'react-icons/gi';

const styles = () => ({
    divider:
    {
        height: 2,
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: 'black'
    }
});

const theme = createMuiTheme({
	typography:
	{
		allVariants: { fontFamily: `"Varela Round", sans-serif` },
        h5: { fontWeight: 600, marginBottom: 2 },
        body1: { fontSize: 17.5 },
        body2: { fontSize: 15.5 },
        subtitle1: { fontWeight: 600, marginBottom: 5 },
        subtitle2: { fontWeight: 600, fontSize: 15, marginRight: 15 }
	}
});

function About(props) 
{
    //const image = "https://firebasestorage.googleapis.com/v0/b/tsahis-website.appspot.com/o/Backgrounds%2FIMG_0561_Easy-Resize.com.jpg?alt=media&token=f6d4acc4-f5ea-41c1-b018-e3829afeac08";
    const { classes } = props;

    return (
        <div className="about-container">
            <Helmet><title>אודות | האיש והמילה הכתובה</title></Helmet>
            <BackToTop showBelow={100} />
            <ScrollToTop />
            <Navbar />
            <div className="about-header">
                <div className="content">
                    <MuiThemeProvider theme={theme}>
                        <Typography variant="h5">ממש בקטנה עליי</Typography>
                        <Divider className={classes.divider} />
                        <Typography variant="h6">היי! שמי צחי ברשבסקי,</Typography>
                        <Typography variant="body1">
                            אני בן 27, מתגורר במרכז ובפן המקצועי אני בוגר תואר ראשון במדעי המחשב ועוסק בפיתוח ועיצוב אתרים, כך שאת הבלוג הזה כתבתי, עיצבתי והקמתי מאפס בעצמי כפי שחלמתי די הרבה זמן לעשות. בפן האישי, אני אוהב תכנות, צילום, בישול, מוזיקה ונגינה, ומעל הכל, לא קשה לפספס - כתיבה.
                            <br />
                            התחלתי לכתוב כשהייתי בן 17 ועם השנים האהבה שלי למילה הכתובה הלכה והתעצמה. בטבע שלי אני אדם שקט וביישן, כך יצא שבזכות הכתיבה מצאתי את הדרך שלי לצעוק לעולם והיא משקפת את עולמי הפנימי ועוזרת לי לפרוק, לשחרר ולצעוק את כל מה שאין לי אומץ לומר בקול.
                            בעברי כתבתי באתר "מה וזה" שנסגר ב-2019 וכיום כותב באתר "הבלוגרים".
                        </Typography>
                    </MuiThemeProvider>
                    <img src={image} alt="פדיחה! זה אמור להיות אני"/>
                    <Grid container direction="row" justify="flex-start" alignItems="flex-start">
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                            <MuiThemeProvider theme={theme}>
                                <Typography variant="subtitle1">על מה אני כותב?</Typography>
                            </MuiThemeProvider>
                            <div className="paragraph">
                                <MuiThemeProvider theme={theme}>
                                    <Typography variant="body2">
                                        בגדול כמעט על כל נושא, אבל אם הייתי צריך לשים אצבע על נושאים ספציפיים, אז אבחר בנושאים שהכי מעסיקים אותי ביום יום. אהבה, זוגיות ויחסים הם הנושאים שלרוב אני מוצא את עצמי כותב עליהם, העצמה והשראה הם גם נושאים שאני מרבה לכתוב עליהם.
                                    </Typography>
                                </MuiThemeProvider>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                            <MuiThemeProvider theme={theme}>
                                <Typography variant="subtitle1">מהו סגנון הכתיבה שלי?</Typography>
                            </MuiThemeProvider>
                            <div className="paragraph">
                                <MuiThemeProvider theme={theme}>
                                    <Typography variant="body2">
                                    הסגנונות האהובים עליי הם שירה ופואמות; מאז שהתחלתי לכתוב ועד היום כתבתי למעלה מ-2,300 שירים ופואמות. אני אוהב לכתוב גם קטעים ארוכים יותר ואני דוגל בכתיבה קצרה וקולעת שלא עולה על 500 מילים כדי שתעביר את המסר בחדות ובקלות.
                                    </Typography>
                                </MuiThemeProvider>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                            <MuiThemeProvider theme={theme}>
                                <Typography variant="subtitle1">מאיפה אני שואב השראה?</Typography>
                            </MuiThemeProvider>
                            <div className="paragraph">
                                <MuiThemeProvider theme={theme}>
                                    <Typography variant="body2">
                                    אין לי מקור השראה ספציפי, זה יכול להגיע מכל מקום וזו תכונה שאני אוהב ומעריך. לרוב אני כותב על דברים שמעסיקים אותי ובוערים בי, ובהרבה מקרים אני שואב השראה מתמונות שצילמתי, שירים שאני שומע, טקסטים אחרים שקראתי ולפעמים גם ההשראה נולדת משום מקום.
                                    </Typography>
                                </MuiThemeProvider>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
            <div className="about-socials" style={{padding: 20}}>
                <div className="social-media">
                    <MuiThemeProvider theme={theme}>
                        <Typography variant="h5">אני כותב גם ברשתות חברתיות</Typography>
                        <Divider className={classes.divider} />
                    </MuiThemeProvider>
                    <div className="social-container">
                        <a href="https://www.facebook.com/tsahi.barshavsky/" target="_blank">
                            <SiFacebook className="icon" id="facebook" />
                        </a>
                        <MuiThemeProvider theme={theme}>
                            <Typography variant="subtitle2">פייסבוק</Typography>
                        </MuiThemeProvider>
                    </div>
                    <div className="social-container">
                        <a href="https://www.instagram.com/tsahi_barshavsky/" target="_blank">
                            <FaInstagram className="icon" id="instagram" />
                        </a>
                        <MuiThemeProvider theme={theme}>
                            <Typography variant="subtitle2">אינסטגרם</Typography>
                        </MuiThemeProvider>
                    </div>
                    <div className="social-container">
                        <a href="https://www.thebloggers.co.il/author/tsahib/" target="_blank">
                            <GiWorld className="icon" id="blog" />
                        </a>
                        <MuiThemeProvider theme={theme}>
                            <Typography variant="subtitle2">הדף שלי באתר הבלוגרים</Typography>
                        </MuiThemeProvider>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default withStyles(styles)(About);