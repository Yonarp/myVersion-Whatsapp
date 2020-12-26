import React from 'react'
import './Message.scss';

function Message({data}) {
    return (
        <div className = 'text'>
            <p>{data.message}</p>
            
        </div>
    )
}

export default Message
