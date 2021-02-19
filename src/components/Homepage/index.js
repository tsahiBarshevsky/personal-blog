import React, { useState, useEffect } from 'react';
import Card from '../Card';
import firebase from '../firebase';

export default function Homepage() 
{
    const [posts, setPosts] = useState([]);

    useEffect(() =>
    {
        firebase.getAllPosts().then(setPosts);
    }, []);

    return (
        <div className="container">
            <div className="posts">
                {posts.map((post, index) =>
                    <div index={index}>
                        <Card mainImageLink={post.mainImageLink}
                            category={post.category}
                            title={post.title}
                            subtitle={post.subtitle} />
                    </div>
                )}
            </div>
        </div>
    )
}
