import { Avatar } from '@material-ui/core';
import React from 'react'
import { useDispatch } from 'react-redux';
import {  setChat } from '../../features/chatSlice';
import './SidebarChat.scss';

function SidebarChat({id,chatName}) {
/*     const chat = useSelector(selectChatName)
    const chatId = useSelector(selectChatId) */
    const dispatch = useDispatch()

    function setChatName() {
        dispatch(setChat({
            chatName: chatName,
            chatId:id 
        }))
    }

    return (
        <div className='sidebar-chat' onClick = {setChatName}>
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
