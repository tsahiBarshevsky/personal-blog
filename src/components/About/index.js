import React from 'react';
import { Typography } from '@material-ui/core';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
// import Navbar from '../Navbar';
// import Footer from '../Footer';

const theme = createMuiTheme({
	typography:
	{
		allVariants: { fontFamily: `"Varela Round", sans-serif` },
        h6: { fontWeight: 600, marginBottom: 5 }
	}
});

export default function About() 
{
    const image = "https://firebasestorage.googleapis.com/v0/b/tsahis-website.appspot.com/o/Backgrounds%2FIMG_0561_Easy-Resize.com.jpg?alt=media&token=f6d4acc4-f5ea-41c1-b018-e3829afeac08";

    return (
        <>
            {/* <Navbar /> */}
            <div className="container"> 
                <div className="about-container" id="about">
                    <p>
                        <img src={image} alt="זה אני!" className="image"/>
                        <b>היי! שמי צחי ברשבסקי.</b> <br />
                        אני בן 27, מתגורר במרכז ובפן המקצועי אני בוגר תואר ראשון במדעי המחשב ומתכנת Frontend. 
                        בפן ה"פחות" מקצועי, אני אוהב צילום, בישול, מוזיקה, ומעל הכל, איך לא - כתיבה.
                        התחלתי לכתוב כשהייתי בן 17 ועם השנים האהבה שלי למילה הכתובה הלכה והתעצמה.
                        {/* לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית לפרומי בלוף קינץ תתיח לרעח. לת צשחמי צש בליא, מנסוטו צמלח לביקו ננבי, צמוקו בלוקריה שיצמה ברורק. צש בליא, מנסוטו צמלח לביקו ננבי, צמוקו בלוקריה שיצמה ברורק. הועניב היושבב שערש שמחויט – שלושע ותלברו חשלו שעותלשך וחאית נובש ערששף. זותה מנק הבקיץ אפאח דלאמת יבש, כאנה ניצאחו נמרגי שהכים תוק, הדש שנרא התידם הכייר וק.
                        גולר מונפרר סוברט לורם שבצק יהול, לכנוץ בעריר גק ליץ, קונדימנטום קורוס בליקרה, נונסטי קלובר בריקנה סטום, לפריקך תצטריק לרטי.
                        קולורס מונפרד אדנדום סילקוף, מרגשי ומרגשח. עמחליף לורם איפסום דולור סיט אמט, נולום ארווס סאפיאן – פוסיליס קוויס, אקווזמן סחטיר בלובק. תצטנפל בלינדו למרקל אס לכימפו, דול, צוט ומעיוט – לפתיעם ברשג – ולתיעם גדדיש. קוויז דומור ליאמום בלינך רוגצה. לפמעט מוסן מנת. מוסן מנת. להאמית קרהשק סכעיט דז מא, מנכם למטכין נשואי מנורך. קוואזי במר מודוף. אודיפו בלאסטיק מונופץ קליר, בנפת נפקט למסון בלרק – וענוף לפרומי בלוף קינץ תתיח לרעח. לת צשחמי צש בליא, מנסוטו צמלח לביקו ננבי, צמוקו בלוקריה שיצמה ברורק. */}
                    </p>
                </div>
            </div>
            {/* <Footer /> */}
        </>
    )
}