import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { checkIfPrivate, selectChatId, selectChatName } from '../../features/chatSlice';
import { db } from '../../firebase/firebase';
import firebase from 'firebase';
import Message from '../message/Message';
import './Chat.scss';
import { selectUser } from '../../features/userSlice';
import { selectDarkMode , setDark } from '../../features/darkModeSlice';


function Chat() {
    const chatName = useSelector(selectChatName);
    const chatId = useSelector(selectChatId);
    const isPrivate = useSelector(checkIfPrivate);
    const user = useSelector(selectUser);
    const isDark = useSelector(selectDarkMode);
    const [input,setInput] = useState('')
    const [messages,setMessages] = useState([]);
    const dispatch = useDispatch()
    const privateChat = 'Private Chat';
    const groupChat = 'Group Chat';

    const throwMessages = (collection) => {
        /* this function pushes the message data on firebase collection: messages */

        db.collection(collection).doc(chatId).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            uid: user.uid,
            displayName: user.displayName,
            userImage: user.userImage,
            email: user.email
        })
    }

    const toggleDark = () => {
        if(isDark)
        {
            dispatch(setDark({
                isDark: true
            }))
        }
        else{
            dispatch(setDark({
                isDark: false
            }))
        }
        console.log(isDark);
    }
    
    useEffect(() => {

        const receiveMessages = (collection) => {
            /* this function receives data from collection: messages */
            
            db.collection(collection)
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

        if(chatId)
        {
            if(isPrivate){
                receiveMessages('private_chats')
            }
            else{
                receiveMessages('chats');
            }
        }
    }, [chatId,isPrivate])

    function submition(e){

        e.preventDefault();
        if(input)
        {
            if(isPrivate){
                throwMessages('private_chats');
            }
            else{
                throwMessages('chats');
            }
        }
      
        setInput('');
    }


    return (
        <div className='chat'>
            <div className="chat-header">
                <div className="chat-header-headings">
                <h1>To:<span className='chat-header-contact'> {chatName} </span></h1>
                <h2>{(isPrivate?privateChat:groupChat)}</h2>
                </div>
                <div className="dark-mode-button" onClick= {toggleDark}>
                    Toggle Dark
                </div>
            </div>
            <div className={`chat-messages ${isDark? 'chat-messages-dark': ''}`}>
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
