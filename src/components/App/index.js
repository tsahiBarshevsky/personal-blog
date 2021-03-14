import React, { useState, useEffect } from 'react';
import './styles.scss';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline, Typography } from '@material-ui/core';
import { Bars, useLoading } from '@agney/react-loading';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import firebase from '../firebase';
import Homepage from '../Homepage';
import Admin from '../Admin';
import Dashboard from '../Dashboard';
import Editor from '../Editor';
import Post from '../Post';
import EditPost from '../Edit Post';
import Page404 from '../Page 404';
import Categories from '../Categories';
import Category from '../Categories/category';

const theme = createMuiTheme();
const typographyTheme = createMuiTheme({
	typography:
	{
		allVariants:
		{
			fontFamily: `"Varela Round", sans-serif`,
		},
        subtitle2:
        {   
            fontSize: 18,
            color: '#159753',
            fontWeight: 600,
            paddingTop: 10
        }
	}
});

export default function App() 
{
    const [firebaseInitialized, setFirebaseInitialized] = useState(false);
	const { indicatorEl } = useLoading({
        loading: true,
        indicator: <Bars width="50" className="loading" />,
    });

	useEffect(() => {
		firebase.isInitialized().then(val => {
			setFirebaseInitialized(val)
		});
	});

    return firebaseInitialized !== false ? (
		<MuiThemeProvider theme={theme}>
			<CssBaseline />
			<Router>
				<Switch>
                    <Route exact path="/" component={Homepage} />
					<Route exact path="/categories" component={Categories} />
					<Route exact path="/categories/:category" component={Category} />
                    <Route exact path="/admin" component={Admin} />
                    <Route exact path="/dashboard" component={Dashboard} />
					<Route exact path="/editor" component={Editor} />
					<Route exact path="/edit/:title" component={EditPost} />
					<Route exact path="/:title" component={Post} />
					<Route exact path="*" component={Page404} />
				</Switch>
			</Router>
		</MuiThemeProvider>
	) 
	: 
	<div className="full-container">
		{indicatorEl}
		<MuiThemeProvider theme={typographyTheme}>
			<Typography align="center" variant="subtitle2">
				רק רגע...
			</Typography>
		</MuiThemeProvider>
	</div>
}
