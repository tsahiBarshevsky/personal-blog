import React from 'react';
import { Button, Typography } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { Link } from 'react-router-dom';

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
        h4:
        {
            fontWeight: 600
        },
        h6:
        {
            textAlign: 'center',
            paddingBottom: 25
        }
	}
});

function Page404(props)
{
    const { classes } = props;

    return (
        <div className="full-container">
            <MuiThemeProvider theme={theme}>
                <Typography variant="h4">נראה שמשהו השתבש...</Typography>
                <Typography variant="h6" display="block">
                    כנראה שהדף שחיפשת לא קיים.
                    לא נורא, את/ה בידיים בטוחות.
                </Typography>
            </MuiThemeProvider>
            <Button component={Link}
                to="/" variant="contained"
                className={classes.button}>חזרה לדף הבית</Button>
        </div>
    )
}

export default withStyles(styles)(Page404);