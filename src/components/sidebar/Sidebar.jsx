import {  IconButton } from '@material-ui/core'
import { ChatBubble, Create, Search } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/userSlice'
import { db,auth } from '../../firebase/firebase'
import PrivateChats from '../privateChats/PrivateChats'
import SidebarChat from '../sidebarChat/SidebarChat'
import './Sidebar.scss'

/**
 * Get all chats of the respective id.
 * @param {Array} chatList - array of chats containing `uid1` and `uid2`
 * @param {String} userId - id of any user
 */
const findChatsWithId = (chatList, userId) =>  chatList?.filter(({uid1, uid2}) => uid1 === userId || uid2 === userId);



const createPrivateChat = async (id,user) => {
    const snapshot = await db.collection('users').doc(id).get();

    const userId = snapshot?.data()?.uid;
     if(userId){
         db.collection('private_chats').doc().set({
             uid1:user.uid,
             uid2:userId,
         })
     }
 }


 const createChat = () => {
    const chatName = prompt("Enter The Chat Name Here");
    if(chatName){
        db.collection('chats').add({
            chatName:chatName,
        })
    }
 }
 

function Sidebar() {
    const user = useSelector(selectUser);
    const [chats,setChats] = useState([]);
    const [existingId,setExistingId] = useState([]);
    
    useEffect(() => {
        db.collection('chats').onSnapshot((snapshot) => {
            setChats(
                snapshot.docs.map((doc)=>(
                    {
                    id: doc.id,
                    data: doc.data(),
                    }
                    )) 
            )
        })
        db.collection('private_chats').onSnapshot((snapshot) => {
            setExistingId(snapshot.docs.map((item) => ({
                id:item.id,
                uid1: item.data().uid1,
                uid2: item.data().uid2
            })))
        })
    },[])



     async function createPersonal (){
       // user input
       const recepientId = prompt('Please Enter the id here ');
       
       if(recepientId) {
            // User id
            const {uid} = user;
            // Getting user chats
            const userChats = findChatsWithId(existingId, uid);
            // User chats with recepient
            console.log('USER CAHTS ==>' ,userChats)
            const chatWithRecepient = findChatsWithId(userChats, recepientId);

            // Check if chat with recepient exists
            if(chatWithRecepient?.length) {
                alert('Conversation already exists');
            } else {
                // If no chats exist, create a private chat.
                createPrivateChat(recepientId, user); 
            }
       }
    }
    console.log(existingId);

    return (
        <div className= 'sidebar'>  

            <div className="sidebar-header">

                {/* -----------------User Details here---------------- */}
                <div className="sidebar-header-user-details">
                
                <div className="sidebar-avatar" onClick= {() => auth.signOut()}
                    style={{backgroundImage:`url(${user.userImage})`}}>
                </div>
                    <h1>{user.displayName}</h1>
                    <h2>{user.email}</h2>

                </div>
               

                <div className="sidebar-input">
                   
                    <Search style = {{color:'#25D366'}} />
                    <input type="search" placeholder='Search'/>

                </div>

                <div className="icon-buttons">

                <IconButton variant = 'outlined' className="sidebar-button">

                    <Create onClick = {createChat}  classes={{root: 'sidebar-button-icon'}}/>

                </IconButton>

                <IconButton variant = 'outlined'  className="sidebar-button">

                    <ChatBubble onClick = {createPersonal} classes={{root: 'sidebar-button-icon'}}/>

                </IconButton>
                </div>
            </div>
            <div className="sidebar-chats">
               {chats.map((chat) => (
                   <SidebarChat key = {chat.id} id = {chat.id} chatName = {chat.data.chatName}/>
               )

               )}

            </div>
            <div className="sidebar-private-chats"> 
               {existingId.map(ids => {
                    if((user.uid === ids.uid1) || (user.uid === ids.uid2)){
                        return <PrivateChats key={ids.id} id={ids.id} {...ids}/>;
                    } else {
                        return null;
                    }
               })
            }

            </div>
        </div>
    )
}

export default Sidebar
