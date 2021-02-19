import React, { useState, useEffect } from 'react';
import firebase from '../firebase';
import { withRouter } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const theme = createMuiTheme({
	typography:
	{
		allVariants:
		{
			fontFamily: `"Varela Round", sans-serif`,
		}
	}
});

function Dashboard(props) {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        firebase.getAllPosts().then(setPosts);
    }, []);

    if (!firebase.getCurrentUsername()) {
		props.history.replace('/admin');
		return null;
	}

    const renderPosts = () =>
    {
        var sorted = posts.sort((a,b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0));
        return (
            <tbody>
                {sorted.map((post, index) =>
                    <tr index={index}>
                        <td>{index+1}</td>
                        <td>{post.title}</td>
                        <td>{new Date(post.date.seconds * 1000).toLocaleDateString("en-GB")}</td>
                        <td>{post.category}</td>
                        <td>עריכה/מחיקה</td>
                    </tr>
                )}
            </tbody>
        )
    }

    return (
        <div className="container">
            <div className="header">
                <MuiThemeProvider theme={theme}>
                    <Typography variant="h4">פוסטים</Typography>
                </MuiThemeProvider>
                <Button to="/editor"
                    component={Link} 
                    variant="contained">פוסט חדש</Button>
                <Button variant="contained" onClick={logout}>התנתק</Button>
            </div>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>כותרת</th>
                            <th>תאריך</th>
                            <th>קטגוריה</th>
                            <th>אפשרויות</th>
                        </tr>
                    </thead>
                    {renderPosts()}
                </table>
            </div>
        </div>
    )

    async function logout() {
		await firebase.logout();
		props.history.push('/');
	}
}

export default withRouter(Dashboard);