import React, { useEffect, useState } from 'react';
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
import { Helmet } from 'react-helmet';
import { green } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import InputTags from "react-input-tags-hooks";
import 'react-input-tags-hooks/build/index.css';

const styles = () => ({
    button:
    {
        color: 'white',
        width: 120,
        height: 40,
        fontSize: 16,
        backgroundColor: green[500],
        borderRadius: 15,
        marginLeft: 10,
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
    const [tags, setTags] = useState([]);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [disableSending, setDisableSending] = useState(true);
    const [editorKey, setEditorKey] = useState(4);
    const [state, setState] = useState({
        title: false,
        subtitle: false,
        checkCategory: false,
        checkText: false,
        checkCredit: false,
        checkTags: false
    });
    const [disableTitle, setDisableTitle] = useState(true);
    const [disableSubtitle, setDisableSubtitle] = useState(true);
    const [disableCategory, setDisableCategory] = useState(true);
    const [disableText, setDisableText] = useState(true);
    const [disableCredit, setDisableCredit] = useState(true);
    const [disableTags, setDisableTags] = useState(true);
    
    const { checkTitle, checkSubtitle, checkCategory, checkText, checkCredit, checkTags } = state;
    const errorCheck = [checkTitle, checkSubtitle, checkCategory, checkText, checkCredit, checkTags].filter((v) => v).length !== 6;
    const { classes } = props;

    console.log(text.split('\n'));

    useEffect(() => {
        if (!errorCheck) 
            setDisableSending(false);
        else
            setDisableSending(true)
        switch(title)
        {
            case '': 
                setDisableTitle(true)
                break;
            default: 
                setDisableTitle(false);
        }
        switch(subtitle)
        {
            case '':
                setDisableSubtitle(true);
                break;
            default: setDisableSubtitle(false);
        }
        switch(category)
        {
            case '':
                setDisableCategory(true);
                break;
            default: setDisableCategory(false);
        }
        switch(text)
        {
            case '':
                setDisableText(true);
                break;
            default: setDisableText(false);
        }
        switch(credit)
        {
            case '':
                setDisableCredit(true);
                break;
            default: setDisableCredit(false);
        }
        switch(tags.length)
        {
            case 5:
                setDisableTags(false);
                break;
            default: setDisableTags(true);
        }
    }, [setDisableTitle, setDisableSubtitle, setDisableCategory, setDisableText, setDisableCredit, setDisableTags,
        title, subtitle, category, text, credit, tags, errorCheck, setDisableSending]);

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

    const handleMainImageChange = e =>
	{
		if (e.target.files[0])
		{
            console.log(e.target.files[0].size);
			try 
			{	
				if (title !== '')
                {
                    if (e.target.files[0].size < 3500000) //less then 3mb
                    {
                        const uploadTask = firebase.storage.ref(`posts/${title}/main/main image`).put(e.target.files[0]);
                        uploadTask.on(
                            "state_changed", 
                            snapshot => 
                            {
                                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                                setProgress(progress);
                                if (progress === 100)
                                {
                                    const storageRef = firebase.storage.ref();
                                    var metadata = {
                                        customMetadata : 
                                        {
                                            'owner': `${credit}`
                                        }
                                    }
                                    var forestRef = storageRef.child(`posts/${title}/main/main image`);
                                    forestRef.updateMetadata(metadata)
                                    .then((metadata) => { console.log("ok"); })
                                    .catch((error) => { console.log(error.message); });
                                }
                            }, 
                            error => {console.log(error);});
                    }
                    else
                    {
                        setError("התמונה גדולה מדי");
                        setOpenError(true);
                    }
                }
                else
                {
                    setError("הזן קודם את שם הפוסט");
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
                if (title !== '')
                {
                    for (var i=0; i<e.target.files.length; i++)
                    {
                        if (e.target.files[i].size < 1000000)
                        {
                            const name = e.target.files[i].name.replace(/.jpg|.JPG|.jpeg|.JPEG|.png|.PNG/, "");
                            const uploadTask = firebase.storage.ref(`posts/${title}/${i+1}-${name}`).put(e.target.files[i]);
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
                else
                {
                    setError("הזן קודם את שם הפוסט");
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

    const getTags = (tags) => 
    {
        setTags(tags);
    }

    return (
        <div className="container">
            <Helmet><title>{`האיש והמילה הכתובה | הוספת פוסט`}</title></Helmet>
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
                                color='black'
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
                                {`${240-subtitle.length} תווים נשארו עד מגבלת ה-240`}
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
                            <Typography variant="h5" gutterBottom>{`תמונה ראשית (עד 3.5 מגה)`}</Typography>
                        </ThemeProvider>
                        <Input
                            accept="image/*"
                            id="upload-photo"
                            name="upload-photo"
                            type="file"
                            disableUnderline
                            onChange={handleMainImageChange} />
                        {progress > 0 ? 
                            <Box mt={3} mb={2}>
                                <ProgressBar
                                width="250px"
                                completed={progress} 
                                bgcolor="#ff4040" 
                                labelColor="#000000" 
                                labelAlignment="center" />
                            </Box>
                        : null}
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
            <div className="text-container">
                <div className="editor">
                    <ThemeProvider theme={theme}>
                        <Typography variant="h5" gutterBottom>{`טקסט`}</Typography>
                    </ThemeProvider>
                    <TinyEditor key={editorKey}
                        apiKey="zldvh8un2rgq0rrlpknan9mw1hjelxw4f565hnhk8qz7b8zs"
                        outputFormat='text'
                        init={{
                        height: 500,
                        width: '100%',
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
                </div>
                <div className="text-format-preview">
                    <ThemeProvider theme={theme}>
                        <Typography variant="h5" gutterBottom>פורמט טקסט - תצוגה מקדימה</Typography>
                    </ThemeProvider>
                    {text !== '' ?
                    <>
                        {text.split('\n').map((paragraph, index) =>
                            <div key={index}>
                                {paragraph !== '' ? 
                                    <p id="paragraph">פסקה</p>
                                :
                                    [(category === 'שירים' ?
                                        <p id="image">רווח</p>
                                    :
                                        <p id="image">תמונה</p>
                                    )]
                                }
                            </div>
                        )}
                    </>
                    : null}
                </div>
            </div>
            <ThemeProvider theme={theme}>
                <Typography variant="h5" gutterBottom>תמונות נוספות - עד 1 מגה</Typography>
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
            <Box mt={3}>
                <ProgressBar width="250px"
                    completed={progress2} 
                    bgcolor="#ff4040" 
                    labelColor="#000000" 
                    labelAlignment="center" /> 
            </Box>
            : null}
            <div className="tags-container">
                <ThemeProvider theme={theme}>
                    <Typography variant="h5" gutterBottom>{`תגיות`}</Typography>
                </ThemeProvider>
                <InputTags
                    onTag={getTags}
                    tagColor={green[300]}
                    placeHolder="הוסף תגית..."
                    
                />
            </div>
            <FormControl required error={errorCheck} component="fieldset">
                <FormLabel component="legend">צ'ק ליסט</FormLabel>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox checked={checkTitle}  onChange={handleChange} name="checkTitle" color="primary" />}
                        label="כותרת"
                        className="checkBox"
                        disabled={disableTitle}
                    />
                    <FormControlLabel
                        control={<Checkbox checked={checkSubtitle}  onChange={handleChange} name="checkSubtitle" color="primary" />}
                        label="תקציר"
                        className="checkBox"
                        disabled={disableSubtitle}
                    />
                    <FormControlLabel
                        control={<Checkbox checked={checkCategory}  onChange={handleChange} name="checkCategory" color="primary" />}
                        label="קטגוריה"
                        className="checkBox"
                        disabled={disableCategory}
                    />
                    <FormControlLabel
                        control={<Checkbox checked={checkText}  onChange={handleChange} name="checkText" color="primary" />}
                        label="טקסט"
                        className="checkBox"
                        disabled={disableText}
                    />
                    <FormControlLabel
                        control={<Checkbox checked={checkCredit}  onChange={handleChange} name="checkCredit" color="primary" />}
                        label="קרדיט תמונה ראשית"
                        className="checkBox"
                        color="primary"
                        disabled={disableCredit}
                    />
                    <FormControlLabel
                        control={<Checkbox checked={checkTags}  onChange={handleChange} name="checkTags" color="primary" />}
                        label="5 תגיות"
                        className="checkBox"
                        color="primary"
                        disabled={disableTags}
                    />
                    <FormHelperText className="helper">
                        {!errorCheck ? "יאללה, שגר אותו!" : "אופס, לא סימנת הכל"}
                    </FormHelperText>
                </FormGroup>
            </FormControl>
            <div className="buttons">
                <Button className={classes.button}
                variant="contained" 
                onClick={addPost} 
                disabled={disableSending}>הוסף</Button>
                <Button className={classes.button} variant="contained" onClick={clearForm}>נקה</Button>
            </div>
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
                await firebase.addPost(title, subtitle, date, category, text, credit, tags);
                setMessage("הפוסט נוסף בהצלחה");
                setOpenSuccess(true);
                setDisableSending(true);
                setTimeout(() => 
                {
                    props.history.replace("/dashboard");
                }, 3500);
            }
            else
            {
                setOpenError(true);
                setError("התאריך חלף כבר");
            }
        } 
        catch (error) 
        {
            console.log(error.message);
        }
    }
}

export default withRouter(withStyles(styles)(Editor));