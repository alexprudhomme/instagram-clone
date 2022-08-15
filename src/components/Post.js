import React from 'react';
import "./Post.css"
import {Avatar} from '@mui/material';
import {useState} from 'react'
function Post({username, caption, imageURL}){
    const [comments, setComments] = useState([]);

    return (
        <div className="post">
            <div className='post__header'>
            <Avatar
            className="post__avatar"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOymC1DanV1_r1MZCzwWUSNuyPes7GI-rU78dOiBTX&s"/>
            <h3>{username}</h3>
            </div>
            
            <img className="post__image" src={imageURL}
            alt=""/>
            <h4 className="post__text"><strong>{username}</strong> {caption}</h4>
        </div>
    )
}

export default Post