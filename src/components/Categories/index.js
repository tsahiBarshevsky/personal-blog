import React, { useState, useEffect } from 'react';
import firebase from '../firebase';

export default function Categories() 
{
    const [categories, setCategories] = useState([]);

    useEffect(() =>
    {
        firebase.getAllCategories().then(setCategories);
    }, []);

    return (
        <div className="container">
            {categories.map((category, index) =>
                <div key={index}>
                    {category}     
                </div>
            )}
        </div>
    )
}