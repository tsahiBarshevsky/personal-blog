import React from 'react';
import { Icon } from '@iconify/react';
import instagramFill from '@iconify-icons/akar-icons/instagram-fill';

export default function Socials() {
    return (
        <div className="socials-container">
            <a target="_blank" href='https://www.instagram.com/tsahi_barshavsky/'>
                <Icon icon={instagramFill} color="#ffffff" width="30" height="30" />
            </a>
        </div>
    )
}