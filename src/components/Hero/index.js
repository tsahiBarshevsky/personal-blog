import React from 'react';
import { Typography, Button } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { Link } from 'react-scroll';
import { Link as LinkR } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
    button:
    {
        color: 'white',//'#4caf50',
        width: 161,
        height: 45,
        fontSize: 17,
        backgroundColor: 'transparent',
        border: '2px solid #4caf50',
        borderRadius: 25,
        marginLeft: 10,
        marginBottom: 10,
        transition: 'all 0.4s ease-out',
        '&:hover':
		{
            color: 'white',
			backgroundColor: green[500]
		}
    }
});

const theme = createMuiTheme({
	typography:
	{
		allVariants: 
        {
			fontFamily: `"Varela Round", sans-serif`,
            color: 'whitesmoke'
		},
        h3:
        {
            fontFamily: `"Gveret-Levin", sans-serif`,
            fontSize: 'calc(3vw + 3vh + 1vmin)',
            lineHeight: 1,
            marginTop: 10,
            textShadow: '4px 4px 2px rgba(0, 0, 0, 0.7)'
        },
        body1:
        {
            fontSize: 20,
            marginTop: 15,
            width: '70%',
            '@media (max-width: 700px)':
            {
                width: '100%'
            },
            '@media (max-width: 430px)':
            {
                lineHeight: 1.2
            }
        }
	}
});

function Hero(props) 
{
    const { classes } = props;

    return (
        <div className="hero-container">
            <div className="hero-black">
                <div className="hero-content">
                    <MuiThemeProvider theme={theme}>
                        <Typography variant="h5">ברוכים הבאים לבלוג</Typography>
                        <Typography variant="h3">האיש והמילה הכתובה</Typography>
                        <Typography variant="body1">
                            ארנסט המינגוויי טען ש
                            <i>"אין מה לכתוב. כל מה שאתה עושה זה להתיישב ליד מכונת כתיבה ומדמם". </i><br />
                            שמי צחי ואמנם היום אני לא כותב עם מכונת כתיבה (הלוואי וכן),
                            אבל עדיין, הכתיבה עבורי מהווה שער כניסה לנבכי הנפש 
                            ונותנת לי את האומץ לצעוק את הדברים שאני לא מסוגל לומר.
                        </Typography>
                    </MuiThemeProvider>
                </div>
                <div className="buttons-container">
                    <Button variant='contained' component={LinkR} to="/about"
                    className={classes.button}>קצת עליי</Button>
                    <Button variant='contained' component={Link} to='posts'
                        smooth={true} duration={1000} spy={true}
                        exact='true' offset={-45} className={classes.button}>פוסטים אחרונים</Button>
                </div>
            </div>
        </div>
    )
}

export default withStyles(styles)(Hero);