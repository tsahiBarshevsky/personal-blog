import React, { useState, useEffect } from 'react';
import './styles.scss';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline, CircularProgress  } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import firebase from '../firebase';
import Homepage from '../Homepage';
import Admin from '../Admin';
import Dashboard from '../Dashboard';
import Editor from '../Editor';

const theme = createMuiTheme();

export default function App() 
{
    const [firebaseInitialized, setFirebaseInitialized] = useState(false);

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
                    <Route exact path="/admin" component={Admin} />
                    <Route exact path="/dashboard" component={Dashboard} />
					<Route exact path="/editor" component={Editor} />
				</Switch>
			</Router>
		</MuiThemeProvider>
	) : <div id="loader"><CircularProgress /></div>
}
