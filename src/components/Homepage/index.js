import React, { useState, useEffect } from 'react';
import Card from '../Card';
import firebase from '../firebase';

export default function Homepage() 
{
    const [post, setPost] = useState('');

    useEffect(() =>
    {
        firebase.getPost("על הגובה").then(setPost);
    }, []);

    return (
        <div className="container">
            <Card mainImageLink={post.mainImageLink}
                category={post.category}
                title={post.title}
                subtitle={post.subtitle} />
        </div>
    )
}
