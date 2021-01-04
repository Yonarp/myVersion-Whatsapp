import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setChat } from '../../features/chatSlice';
import { selectUser } from '../../features/userSlice';
import { db } from '../../firebase/firebase';
import './PrivateChats.scss';



function PrivateChats({id,...ids}) {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const [contact,setContact] = useState([]);
    const [chatData,setChatData] = useState([]);

    /* Fetching The Contacts ID from Firebase */

    const getContact = (id) => {
        db.collection('users').doc(id).get().then(snapshot => {
            setContact(
                {
                userName: snapshot.data().displayName,
                userImage: snapshot.data().userImage
                }

            )
        })

    }

    const setPrivateChat = () => {
        dispatch(setChat({
            chatId: id,
            chatName: contact.userName,
            private: true     
        }))
    }


    /* Finding out the Id of the Contact by seperating users uid from the private chat  */

    useEffect(() => {
        if(user.uid === ids.uid1){
            getContact(ids.uid2)
        }
        else {
            getContact(ids.uid1)
        }
        /* fetching the chat messages through firebase  */
        db.collection('private_chats').doc(id).collection('messages').orderBy('timestamp' , 'desc').onSnapshot(snapshot => {
            setChatData(snapshot.docs.map(doc => (
                doc.data()
                )))
        })

    }, [ids.uid1,ids.uid2,user.uid,id])


    return (
        <div className = 'sidebar-chat' onClick={setPrivateChat}>
            <div className='sidebar-chat-avatar private'>
                <Avatar  src = {contact.userImage}/>
                <h4>Private</h4>
            </div>
            <div className="sidebar-chat-content">
            <h2>{contact.userName}</h2>
            <h3>{chatData[0]?.message}</h3> {/* dispalying the last message in the chat */}
            <p>{new Date(chatData[0]?.timestamp?.toDate()).toLocaleString()}</p>
            </div>
        </div>
    )
}

export default PrivateChats
