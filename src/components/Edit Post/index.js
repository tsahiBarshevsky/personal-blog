import React, { useState, useEffect } from 'react';
import firebase from '../firebase';
import { withRouter } from 'react-router-dom';
import { Editor as TinyEditor } from '@tinymce/tinymce-react';
import { Box, Button, Checkbox, FormControl, Snackbar, TextField, Typography } from '@material-ui/core';
import { withStyles, createMuiTheme, MuiThemeProvider, ThemeProvider, StylesProvider, jssPreset } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import rtl from 'jss-rtl';
import { create } from 'jss';
import { red, green } from '@material-ui/core/colors';
import { Helmet } from 'react-helmet';
import { Bars, useLoading } from '@agney/react-loading';

const styles = () => ({
    button:
    {
        color: 'white',
        width: 120,
        height: 40,
        fontSize: 16,
        backgroundColor: green[500],
        borderRadius: 15,
        marginTop: 40,
        transition: 'all 0.5s ease-out',
        '&:hover':
		{
			backgroundColor: green[300]
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
        h5:
        {
            textDecoration: 'underline'
        },
        subtitle1:
        {
            color: red[900]
        }
	},
    direction: "rtl"
});

const typographyTheme = createMuiTheme({
	typography:
	{
        subtitle2:
        {   
            fontFamily: `"Varela Round", sans-serif`,
            fontSize: 18,
            color: '#159753',
            fontWeight: 600,
            paddingTop: 10
        }
	}
});

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

function Editor(props) 
{
    const [post, setPost] = useState({});
    const title = props.match.params.title.replaceAll('-', ' ');
    const [subtitle, setSubtitle] = useState('');
    const [category, setCategory] = useState('');
    const [text, setText] = useState('');
    const [firstRun, setFirstRun] = useState(true);
    const [date, setDate] = useState(new Date());
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const { indicatorEl } = useLoading({
        loading: true,
        indicator: <Bars width="50" className="loading" />,
    });
    const { classes } = props;

    useEffect(() => {
        if (firstRun)
        {
            firebase.getPost(title).then(setPost);
            setFirstRun(false);
        }
        setSubtitle(post.subtitle);
        setCategory(post.category);
        if (post.date)
        {
            console.log("in");
            setDate(new Date(post.date.seconds * 1000));
        }
        setText(post.text);
    }, [post]);

    if (!firebase.getCurrentUsername()) {
		props.history.replace('/admin');
		return null;
	}

    const handleEditorChange = (content, editor) => 
    {
        setText(content);
    }

    const handleDateChange = (date) => 
    {
        setDate(date);
    }

    const Alert = (props) =>
    {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
	}

    const closeSnackbar = () =>
	{
		setOpenSuccess(false);
        setOpenError(false);
	}

    return (
        <>
            {Object.keys(post).length > 0 && subtitle ?
            <div className="container">
                <Helmet><title>{`האיש והמילה הכתובה | עריכת ${title}`}</title></Helmet>
                <form>
                    <ThemeProvider theme={theme}>
                        <Typography variant="h5" gutterBottom>{`מידע כללי`}</Typography>
                        <Typography variant="h6" gutterBottom>{`כותרת: ${title}`}</Typography>
                    </ThemeProvider>
                    <StylesProvider jss={jss}>
                        <MuiThemeProvider theme={theme}>
                            <FormControl margin="normal" fullWidth>
                                <TextField label="תקציר"
                                    id="subtitle" name="subtitle"
                                    variant="outlined"
                                    multiline
                                    autoComplete="off" 
                                    value={subtitle} 
                                    onChange={e => setSubtitle(e.target.value)}
                                    inputProps={{maxLength: 240}} />
                            </FormControl>
                            {240 - subtitle.length <= 10 && subtitle.length !== 240 ? 
                            <MuiThemeProvider theme={theme}>
                                <Typography variant="subtitle1">
                                    {`${240-subtitle.length} תווים נשארו עד מגבלת ה-500`}
                                </Typography>
                            </MuiThemeProvider>
                            :
                            [(subtitle.length === 240 ? 
                            <MuiThemeProvider theme={theme}>
                                <Typography variant="subtitle1">
                                    {`חרגת ממגבלת התווים המקסימלית`}
                                </Typography>
                            </MuiThemeProvider>	
                            : null)]}
                            <div className="wrapper pb">
                                <Box mr={2}>
                                    <FormControl margin="normal" fullWidth>
                                        <TextField label="קטגוריה"
                                            id="category" name="category"
                                            variant="outlined"
                                            autoComplete="off" 
                                            value={category} 
                                            onChange={e => setCategory(e.target.value)}
                                            style={{ width: 300 }} />
                                    </FormControl>
                                </Box>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        label="תאריך"
                                        disableToolbar
                                        variant="inline"
                                        format="dd/MM/yyyy"
                                        margin="normal"
                                        id="date-picker-inline"
                                        value={date}
                                        onChange={handleDateChange}
                                        KeyboardButtonProps={{'aria-label': 'change date',}}
                                        style={{ width: 200}} />
                                </MuiPickersUtilsProvider>
                            </div>
                        </MuiThemeProvider>
                    </StylesProvider>
                </form>
                <ThemeProvider theme={theme}>
                    <Typography variant="h5" gutterBottom>{`טקסט`}</Typography>
                </ThemeProvider>
                <TinyEditor
                    apiKey="zldvh8un2rgq0rrlpknan9mw1hjelxw4f565hnhk8qz7b8zs"
                    outputFormat='text'
                    initialValue={text}
                    init={{
                    height: 500,
                    width: '80%',
                    menubar: false,
                    directionality: 'rtl',
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar:
                        'undo redo | formatselect | bold italic backcolor | \
                        alignleft aligncenter alignright alignjustify | \
                        bullist numlist outdent indent | removeformat | help'
                    }}
                    onEditorChange={handleEditorChange}
                />
                <Button variant="contained" onClick={editPost} className={classes.button}>עדכן</Button>
                <Snackbar open={openSuccess} autoHideDuration={3500} onClose={closeSnackbar}>
                    <Alert onClose={closeSnackbar} severity="success">
                        <MuiThemeProvider theme={theme}>
                            <Typography align="center" variant="subtitle2">
                                {message}
                            </Typography>
                        </MuiThemeProvider>
                    </Alert>
                </Snackbar>
                <Snackbar open={openError} autoHideDuration={3500} onClose={closeSnackbar}>
                    <Alert onClose={closeSnackbar} severity="error">
                        <MuiThemeProvider theme={theme}>
                            <Typography align="center" variant="subtitle2">
                                {error}
                            </Typography>
                        </MuiThemeProvider>
                    </Alert>
                </Snackbar>
            </div>
            :
            <div className="full-container">
                {indicatorEl}
                <MuiThemeProvider theme={typographyTheme}>
                    <Typography align="center" variant="subtitle2">
                        טוען נתונים, רק רגע...
                    </Typography>
                </MuiThemeProvider>
            </div>}
        </>
    )

    async function editPost()
    {
        try 
        {
            await firebase.editPost(title, subtitle, category, date, text);
            setMessage("הפוסט עודכן בהצלחה");
            setOpenSuccess(true);
            setTimeout(() => 
            {
                props.history.replace("/dashboard");
            }, 3500);
        } 
        catch (error) 
        {
            console.log(error.message);
            setError('משהו קרה!');
            setOpenError(true);
        }
    }
}

export default withRouter(withStyles(styles)(Editor));