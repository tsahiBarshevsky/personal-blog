import React, { useState } from 'react';
import firebase from '../firebase';
import { withRouter } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { Editor } from '@tinymce/tinymce-react';

function Dashboard(props) {

    const [post, setPost] = useState('');
    const [content, setContent] = useState('');

    if (!firebase.getCurrentUsername()) {
		props.history.replace('/admin');
		return null;
	}

    const handleEditorChange = (content, editor) => 
    {
        setPost(content);
    }

    return (
        <div className="container">
            <Editor
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
            <div className="post">{post}</div>
            <Button onClick={addPost}>הוסף</Button>
            <Button onClick={getPost}>קבל</Button>
            <Button onClick={logout}>התנתק</Button>
            <div className="post">{content.post}</div>
        </div>
    )

    async function addPost()
    {
        await firebase.addPost(post);
    }

    async function getPost()
	{
		try 
		{
			await firebase.getPost().then(setContent);
		} 
		catch (error) 
		{
			console.log(error.message);
		}
	}

    async function logout() {
		await firebase.logout();
		props.history.push('/');
	}
}

export default withRouter(Dashboard);