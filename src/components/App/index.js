import React from 'react';
import './styles.scss';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Homepage from '../Homepage';
import Admin from '../Admin';
import Dashboard from '../Dashboard';

const theme = createMuiTheme();

export default function App() {
    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Switch>
                    <Route exact path="/" component={Homepage} />
                    <Route exact path="/admin" component={Admin} />
                    <Route exact path="/dashboard" component={Dashboard} />
                </Switch>
            </Router>
        </MuiThemeProvider>
    )
}
