import { Avatar } from '@material-ui/core';
import React from 'react'
import './Message.scss';

function Message({data}) {
    return (
        <div className = 'text'>
            <Avatar src = {data.userImage}/>
            <p>{data.message}</p>
            <small>{new Date(data.timestamp?.toDate()).toLocaleString()}</small>
            
        </div>
    )
}

export default Message
