import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { selectChatId, selectChatName } from '../../features/chatSlice';
import { db } from '../../firebase/firebase';
import firebase from 'firebase';
import Message from '../message/Message';
import './Chat.scss';
import { selectUser } from '../../features/userSlice';

function Chat() {
    const chatName = useSelector(selectChatName);
    const chatId = useSelector(selectChatId);
    const user = useSelector(selectUser);
    const [input,setInput] = useState('')
    const [messages,setMessages] = useState([])

    useEffect(() => {
        if(chatId)
        {
        db.collection('chats')
        .doc(chatId)
        .collection('messages')
        .orderBy('timestamp' , 'asc')
        .onSnapshot((snapshot) => {
            setMessages(snapshot.docs.map((message) => ({
                id:message.id,
                data: message.data()
            })
            ))
        })
    }
    }, [chatId])

    function submition(e){
        e.preventDefault();
        db.collection('chats').doc(chatId).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            uid: user.uid,
            displayName: user.displayName,
            userImage: user.userImage,
            email: user.email
        })
        setInput('');
    }


    return (
        <div className='chat'>
            <div className="chat-header">
                <h1>To:<span className='chat-header-contact'> {chatName} </span></h1>
                <h2>Details</h2>
            </div>
            <div className="chat-messages">
                {messages.map((message, idx) => (
                    <Message key = {message.id} data = {message.data} isLast={(idx === messages?.length - 1)}/>
                ))}
            </div>

             
                <form onSubmit={submition} className="chat-input" >
                    <input value={input} onChange={e => setInput(e.target.value) } type='text' placeholder='Message here'/>
                    <button type='submit'/>
                </form>

            
        </div>
    )
}

export default Chat
