import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import {  setChat } from '../../features/chatSlice';
import { db } from '../../firebase/firebase';
import './SidebarChat.scss';

function SidebarChat({id,chatName}) {

    const dispatch = useDispatch()
    const [chatData,setChatData] = useState([])
       
    useEffect(() => {
        /* fetching the messages on the currently active chat channel through firebase  */
      db.collection('chats').doc(id).collection('messages').orderBy('timestamp','desc').onSnapshot((snapshot) => {
        setChatData(snapshot.docs.map((doc) => (
            doc.data()
            )
        ))
      }) 

    }, [id])

    function setChatName() {
        /* storing the chat details locally through redux */
        dispatch(setChat({
            chatName: chatName,
            chatId:id,
            private: false 
        }))
    }

    return (
        <div className='sidebar-chat' onClick = {setChatName}>
            <Avatar className='sidebar-chat-avatar' src={chatData[0]?.userImage}/>
            <div className="sidebar-chat-content">
                <h2>{chatName}</h2>
                <h3>{chatData[0]?.message}</h3> {/*  displaying the last message in the chat  */}
                <p>{new Date(chatData[0]?.timestamp?.toDate()).toLocaleString()}</p>
            </div>
        </div>
    )
}

export default SidebarChat
