import React, { useState } from 'react';
import firebase from '../firebase';
import { withRouter } from 'react-router-dom';
import { Editor as TinyEditor } from '@tinymce/tinymce-react';
import { Button, FormControl, Input, Snackbar, Typography } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const theme = createMuiTheme({
	typography:
	{
		allVariants:
		{
			fontFamily: `"Varela Round", sans-serif`,
		}
	}
});

function Editor(props) {

    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [date, setDate] = React.useState(new Date());
    const [category, setCategory] = useState('');
    const [text, setText] = useState('');
    const [mainImageLink, setMainImageLink] = useState('');
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [error, setError] = useState('');

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
        <div className="container">
            <FormControl margin="normal" fullWidth>
                <Input id="title" name="title"
                    inputProps={{min: 0, style: { marginLeft: '20px' }}} 
                    placeholder="כותרת"
                    autoComplete="off" 
                    autoFocus value={title} 
                    onChange={e => setTitle(e.target.value)} />
            </FormControl>
            <FormControl margin="normal" fullWidth>
                <Input id="subtitle" name="subtitle"
                    inputProps={{min: 0, style: { marginLeft: '20px' }}} 
                    placeholder="תקציר"
                    autoComplete="off" 
                    value={subtitle} 
                    onChange={e => setSubtitle(e.target.value)} />
            </FormControl>
            <FormControl margin="normal" fullWidth>
                <Input id="category" name="category"
                    inputProps={{min: 0, style: { marginLeft: '20px' }}} 
                    placeholder="קטגוריה"
                    autoComplete="off" 
                    value={category} 
                    onChange={e => setCategory(e.target.value)} />
            </FormControl>
            <FormControl margin="normal" fullWidth>
                <Input id="main-image-link" name="main-image-link"
                    inputProps={{min: 0, style: { marginLeft: '20px' }}} 
                    placeholder="לינק לתמונה ראשית"
                    autoComplete="off" 
                    value={mainImageLink} 
                    onChange={e => setMainImageLink(e.target.value)} />
            </FormControl>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Date picker inline"
                    value={date}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{'aria-label': 'change date',}} />
            </MuiPickersUtilsProvider>
            <TinyEditor
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
            await firebase.addPost(title, subtitle, date, category, text, mainImageLink);
            setOpenSuccess(true);
            setTimeout(() => 
            {
                props.history.replace("/dashboard");
            }, 3500);
        } 
        catch (error) 
        {
            console.log(error.message);
        }
    }
}

export default withRouter(Editor);