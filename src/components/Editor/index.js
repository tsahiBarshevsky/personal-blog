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
import ProgressBar from '@ramonak/react-progress-bar';

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

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

function Editor(props) 
{
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [category, setCategory] = useState('');
    const [text, setText] = useState('');
    const [date, setDate] = useState(new Date());
    const [progress, setProgress] = useState(0);
    const [progress2, setProgress2] = useState(0);
    const [credit, setCredit] = useState('');
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [editorKey, setEditorKey] = useState(4);

    if (!firebase.getCurrentUsername()) {
		props.history.replace('/admin');
		return null;
	}

    if (progress === 100 || progress2 === 100)
	{
		setOpenSuccess(true);
		setMessage("התמונה הועלתה בהצלחה");
		setProgress(0);
        setProgress2(0);
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
        setCredit('');
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

    const handleMainImageChange = e =>
	{
		if (e.target.files[0])
		{
			try 
			{	
				if (e.target.files[0].size < 1000000) //less then 1mb
				{
					const uploadTask = firebase.storage.ref(`posts/${title}/main/main image`).put(e.target.files[0]);
					uploadTask.on(
						"state_changed", 
						snapshot => 
                        {
							const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
							setProgress(progress);
						}, 
						error => {console.log(error);});
				}
				else
				{
					setError("התמונה גדולה מ-1 מגה");
					setOpenError(true);
				}
			} 
			catch (error) 
			{
				setError(error.message);
				setOpenError(true);
			}
		}
	}

    const handleImagesChange = e =>
	{
		if (e.target.files)
        {
            try 
            {
                for (var i=0; i<e.target.files.length; i++)
                {
                    if (e.target.files[i].size < 1000000)
                    {
                        const uploadTask = firebase.storage.ref(`posts/${title}/${i+1}`).put(e.target.files[i]);
                        uploadTask.on(
                            "state_changed", 
                            snapshot => 
                            {
                                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                                setProgress2(progress);
                            }, 
                            error => {console.log(error);});
                        }
                    else
                    {
                        setError("אחת התמונות גדולות מדי");
					    setOpenError(true);
                        break;
                    }
                }
            } 
            catch (error)
            {
                setError(error.message);
				setOpenError(true);
            }
        }
	}

    return (
        <div className="container">
            <form>
                <ThemeProvider theme={theme}>
                    <Typography variant="h5" gutterBottom>{`מידע כללי`}</Typography>
                </ThemeProvider>
                <StylesProvider jss={jss}>
                    <MuiThemeProvider theme={theme}>
                        <FormControl margin="normal" fullWidth>
                            <TextField label="כותרת"
                                id="title" name="title"
                                variant="outlined"
                                autoComplete="off" 
                                autoFocus value={title} 
                                onChange={e => setTitle(e.target.value)} />
                        </FormControl>
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
                        <ThemeProvider theme={theme}>
                            <Typography variant="h5" gutterBottom>{`תמונה ראשית`}</Typography>
                        </ThemeProvider>
                        <Input
                            multiple
                            accept="image/*"
                            id="upload-photo"
                            name="upload-photo"
                            type="file"
                            disableUnderline
                            onChange={handleMainImageChange} />
                        {progress > 0 ? 
						<ProgressBar width="250px"
							completed={progress} 
							bgcolor="#ff4040" 
							labelColor="#000000" 
							labelAlignment="center" /> : null}
                        <FormControl margin="normal" fullWidth>
                            <TextField label="קרדיט לתמונה ראשית" 
                                id="main-image-credit" name="main-image-credit"
                                variant="outlined"
                                inputProps={{min: 0, style: { marginLeft: '20px' }}} 
                                autoComplete="off" 
                                value={credit} 
                                onChange={e => setCredit(e.target.value)}
                                className="pb" />
                        </FormControl>
                    </MuiThemeProvider>
                </StylesProvider>
            </form>
            <ThemeProvider theme={theme}>
                    <Typography variant="h5" gutterBottom>{`טקסט`}</Typography>
                </ThemeProvider>
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
            <ThemeProvider theme={theme}>
                <Typography variant="h5" gutterBottom>{`תמונות נוספות`}</Typography>
            </ThemeProvider>
            <input
                multiple
                accept="image/*"
                id="upload-photo"
                name="upload-photo"
                type="file"
                disableUnderline
                onChange={handleImagesChange} />
            {progress2 > 0 ? 
            <ProgressBar width="250px"
                completed={progress2} 
                bgcolor="#ff4040" 
                labelColor="#000000" 
                labelAlignment="center" /> : null}
            <Button variant="contained" onClick={addPost}>הוסף</Button>
            <Button variant="contained" onClick={clearForm}>נקה</Button>
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
    )

    async function addPost()
    {
        try 
        {
            if (date >= new Date().setHours(0, 0, 0, 0))
            {
                await firebase.addPost(title, subtitle, date, category, text, credit);
                setMessage("הפוסט נוסף בהצלחה");
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