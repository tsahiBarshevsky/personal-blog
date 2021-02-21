import React, { useState } from 'react';
import firebase from '../firebase';
import { withRouter } from 'react-router-dom';
import { Editor as TinyEditor } from '@tinymce/tinymce-react';
import { Box, Button, FormControl, Input, Snackbar, TextField, Typography } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider, ThemeProvider, StylesProvider, jssPreset } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import rtl from 'jss-rtl';
import { create } from 'jss';
import { red } from '@material-ui/core/colors';

const theme = createMuiTheme({
	typography:
	{
		allVariants:
		{
			fontFamily: `"Varela Round", sans-serif`,
		},
        subtitle1:
        {
            color: red[900]
        }
	},
    direction: "rtl"
});

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

function Editor(props) 
{
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [category, setCategory] = useState('');
    const [text, setText] = useState('');
    const [date, setDate] = useState(new Date());
    const [mainImageLink, setMainImageLink] = useState('');
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [error, setError] = useState('');
    const [editorKey, setEditorKey] = useState(4);

    if (!firebase.getCurrentUsername()) {
		props.history.replace('/admin');
		return null;
	}

    const handleEditorChange = (content, editor) => 
    {
        setText(content);
    }

    const clearForm = () =>
    {
        setTitle('');
        setSubtitle('');
        setCategory('');
        setText('');
        setMainImageLink('');
        setDate(new Date());
        const newKey = editorKey * 43;
        setEditorKey(newKey);
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
        <div className="container">
            <form>
                <StylesProvider jss={jss}>
                    <MuiThemeProvider theme={theme}>
                        <div className="wrapper">
                            <Box mr={1}>
                                <FormControl margin="normal" fullWidth>
                                    <TextField label="כותרת"
                                        id="title" name="title"
                                        variant="outlined"
                                        autoComplete="off" 
                                        autoFocus value={title} 
                                        onChange={e => setTitle(e.target.value)} />
                                </FormControl>
                            </Box>
                            <Box ml={1}>
                                <FormControl margin="normal" fullWidth>
                                    <TextField label="קטגוריה"
                                        id="category" name="category"
                                        variant="outlined"
                                        autoComplete="off" 
                                        value={category} 
                                        onChange={e => setCategory(e.target.value)} />
                                </FormControl>
                            </Box>
                        </div>
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
                        <FormControl margin="normal" fullWidth>
                            <TextField label="תמונה ראשית" 
                                id="main-image-link" name="main-image-link"
                                variant="outlined"
                                inputProps={{min: 0, style: { marginLeft: '20px' }}} 
                                autoComplete="off" 
                                value={mainImageLink} 
                                onChange={e => setMainImageLink(e.target.value)} />
                        </FormControl>
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
                                style={{ width: 150}} />
                        </MuiPickersUtilsProvider>
                    </MuiThemeProvider>
                </StylesProvider>
            </form>
            <TinyEditor key={editorKey}
                apiKey="zldvh8un2rgq0rrlpknan9mw1hjelxw4f565hnhk8qz7b8zs"
                outputFormat='text'
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
            <Button variant="contained" onClick={addPost}>הוסף</Button>
            <Button variant="contained" onClick={clearForm}>נקה</Button>
            <Snackbar open={openSuccess} autoHideDuration={3500} onClose={closeSnackbar}>
                <Alert onClose={closeSnackbar} severity="success">
                    <MuiThemeProvider theme={theme}>
                        <Typography align="center" variant="subtitle2">
                            {' הפוסט נוסף בהצלחה '}
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
    )

    async function addPost()
    {
        try 
        {
            if (date >= new Date().setHours(0, 0, 0, 0))
            {
                await firebase.addPost(title, subtitle, date, category, text, mainImageLink);
                setOpenSuccess(true);
                setTimeout(() => 
                {
                    props.history.replace("/dashboard");
                }, 3500);
            }
            else
            {
                setOpenError(true);
                setError("תאריך לא טוב")
            }
        } 
        catch (error) 
        {
            console.log(error.message);
        }
    }
}

export default withRouter(Editor);