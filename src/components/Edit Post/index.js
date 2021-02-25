import React, { useState, useEffect } from 'react';
import firebase from '../firebase';
import { withRouter } from 'react-router-dom';
import { Editor as TinyEditor } from '@tinymce/tinymce-react';
import { Box, Button, Checkbox, FormControl, FormGroup, FormLabel, FormControlLabel, Input, Snackbar, TextField, Typography, FormHelperText } from '@material-ui/core';
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
    const [post, setPost] = useState({});
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [category, setCategory] = useState('');
    const [text, setText] = useState('');

    const [firstRun, setFirstRun] = useState(true);
    const [date, setDate] = useState(new Date());
    const [progress, setProgress] = useState(0);
    const [progress2, setProgress2] = useState(0);
    const [credit, setCredit] = useState('');
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [editorKey, setEditorKey] = useState(4);
    const [disableCheckbox, setDisableCheckbox] = useState(true);
    const [numOfImages, setNumOfImages] = useState(0);
    const [state, setState] = useState({
        checkTitle: false,
        checkSubtitle: false,
        checkCategory: false,
        checkText: false,
        checkCredit: false
    });

    console.log(post);
    console.log(text);

    const { checkTitle, checkSubtitle, checkCategory, checkText, checkCredit } = state;
    const errorCheck = [checkTitle, checkSubtitle, checkCategory, checkText, checkCredit].filter((v) => v).length !== 5;

    useEffect(() => {
        if (firstRun)
        {
            firebase.getPost(props.match.params.title).then(setPost);
            setFirstRun(false);
        }
        setTitle(post.title);
        setSubtitle(post.subtitle);
        setCategory(post.category);
        setText(post.text);
    }, [post]);

    if (!firebase.getCurrentUsername()) {
		props.history.replace('/admin');
		return null;
	}

    /*const checkBeforeSend = () =>
    {
        if (checkTitle && checkSubtitle && checkText && checkCategory && checkCredit)
            setEnableButton(false); //enable
    }*/

    const handleChange = (event) => 
    {
        setState({ ...state, [event.target.name]: event.target.checked });
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
                        {/*{240 - subtitle.length <= 10 && subtitle.length !== 240 ? 
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
                        : null)]}*/}
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
            <TinyEditor key={editorKey}
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
            <FormControl required error={errorCheck} component="fieldset">
                <FormLabel component="legend">צ'ק ליסט</FormLabel>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox checked={checkTitle} onChange={handleChange} name="checkTitle" color="primary" />}
                        label="כותרת"
                        className="checkBox"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={checkSubtitle} onChange={handleChange} name="checkSubtitle" color="primary" />}
                        label="תקציר"
                        className="checkBox"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={checkCategory} onChange={handleChange} name="checkCategory" color="primary" />}
                        label="קטגוריה"
                        className="checkBox"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={checkText} onChange={handleChange} name="checkText" color="primary" />}
                        label="טקסט"
                        className="checkBox"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={checkCredit} onChange={handleChange} name="checkCredit" color="primary" />}
                        label="קרדיט תמונה ראשית"
                        className="checkBox"
                        color="primary"
                    />
                    <FormHelperText className="helper">
                        {!errorCheck ? "יאללה, שגר אותו!" : "אופס, לא סימנת הכל"}
                    </FormHelperText>
                </FormGroup>
            </FormControl>
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

    async function getPost()
    {
        try 
		{
			await firebase.getPost(props.match.params.title).then(setPost);
		} 
		catch (error) 
		{
			console.log(error.message);
		}
    }

    async function editPost()
    {
        try 
        {
            if (date >= new Date().setHours(0, 0, 0, 0))
            {
                const storageRef = firebase.storage.ref();
                storageRef.child(`posts/${title}`).listAll()
                .then((res) => 
                {
                    res.items.forEach((itemRef, index) => {
                        const name = itemRef.name;
                        var extractCredit = name.replace(`${index+1}-`, "");
                        var metadata = {
                            customMetadata : 
                            {
                                'owner': `${extractCredit}`
                            }
                        }
                        itemRef.updateMetadata(metadata)
                        .then((metadata) => { console.log("ok"); })
                        .catch((error) => { console.log(error.message); });
                    });
                });
                /*for (var i=0; i<numOfImages; i++)
                {
                    var metadata = {
                        customMetadata : 
                        {
                            'owner': `bla bla`
                        }
                    }
                    var forestRef = storageRef.child(`posts/${title}/${i+1}`);
                    forestRef.updateMetadata(metadata)
                    .then((metadata) => { console.log("ok"); })
                    .catch((error) => { console.log(error.message); });
                }*/
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