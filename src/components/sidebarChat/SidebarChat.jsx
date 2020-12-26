import { Avatar } from '@material-ui/core';
import React from 'react'
import './SidebarChat.scss';

function SidebarChat({id,chatName}) {
    return (
        <div className='sidebar-chat'>
            <Avatar className='sidebar-chat-avatar'/>
            <div className="sidebar-chat-content">
                <h2>{chatName}</h2>
                <h3>This is the last message in the chat</h3>
                <p>TimeStamp here..</p>
            </div>
        </div>
    )
}

export default SidebarChat
