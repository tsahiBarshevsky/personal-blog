import React from 'react';
import { Button, Typography } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { Link } from 'react-router-dom';
import Image from '../../images/coding.png';
import { Helmet } from 'react-helmet';

const styles = () => ({
    button:
    {
        color: '#4caf50',
        width: 175,
        height: 50,
        fontSize: 18,
        backgroundColor: 'transparent',
        border: '3px solid #4caf50',
        borderRadius: 25,
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
		},
        h6:
        {
            textAlign: 'center',
            paddingBottom: 15,
            fontWeight: 600,
            lineHeight: 1.2
        }
	}
});

function Page404(props)
{
    const { classes } = props;

    return (
        <div className="full-container">
            <Helmet><title>האיש והמילה הכתובה | שגיאה</title></Helmet>
            <div className="page-container">
                <MuiThemeProvider theme={theme}>
                    <Typography variant="h3">404</Typography>
                </MuiThemeProvider>
                <hr />
                <div className="content-container">
                    <div className="image-container">
                        <img src={Image} alt="404" />
                    </div>
                    <MuiThemeProvider theme={theme}>
                        <Typography variant="h6" display="block">
                            מצטער, העמוד שחיפשת לא קיים.
                        </Typography>
                    </MuiThemeProvider>
                    <Button component={Link}
                        to="/" variant="contained"
                        className={classes.button}>חזרה לדף הבית</Button>
                </div>
            </div>
        </div>
    )
}

export default withStyles(styles)(Page404);