import React from 'react';

export default function Statistics(props) {
    return (
        <div className="statistics-container">
            <div className="title">
                {props.title}
            </div>
            <div className="content">
                {typeof props.value !== 'object' ? 
                    props.value
                :
                    `${props.value.category} מופיעה ב-${props.value.occurrences} פוסטים`}
            </div>
        </div>
    )
}