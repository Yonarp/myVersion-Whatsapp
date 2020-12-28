import {  IconButton } from '@material-ui/core'
import { ChatBubble, Create, Search } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/userSlice'
import { db,auth } from '../../firebase/firebase'
import PrivateChats from '../privateChats/PrivateChats'
import SidebarChat from '../sidebarChat/SidebarChat'
import './Sidebar.scss'


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
            setExistingId(snapshot.docs.map((item) => item.data()))
        })
    },[])

    function createChat(){
        const chatName = prompt("Enter The Chat Name Here");
        if(chatName){
            db.collection('chats').add({
                chatName:chatName,
            })
        }
    }

    const findChatsWithId = (chatList, userId) =>  chatList?.filter(({uid1, uid2}) => uid1 === userId || uid2 === userId);


     async function createPersonal (){
       const recepientId = prompt('Please Enter the id here ');
       if(recepientId) {
            const {uid} = user;
            const userChats = findChatsWithId(existingId, uid);
            const chatWithRecepient = findChatsWithId(userChats, recepientId);
            console.log('CHAT WITH RECEP', chatWithRecepient);

            if(chatWithRecepient?.length) {
                alert('Conversation already exists');
            } else {
                createPrivateChat(recepientId,user); 
            }
       }
    }


    /* function decide(ids){
        if((user.uid.toString() === ids.uid1) || (user.uid.toString() === ids.uid2))
        {   console.log('ids were matched')
            return <PrivateChats key ={ids.id}/>
        }
    } */


    console.log(existingId);

    return (
        <div className= 'sidebar'>  

            <div className="sidebar-header">

                {/* -----------------User Details here---------------- */}
                <div className="sidebar-header-user-details">

              {/*   <IconButton onClick={() => auth.signOut()}>
                    <Avatar src = {user.userImage}  className='sidebar-avatar' style={{
                        height: '60px',
                        width: '60px'
                    }}/>
                </IconButton> */}
                
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

                    <Create onClick = {createChat} style = {{color:'#25D366'}}/>

                </IconButton>

                <IconButton variant = 'outlined'>

                    <ChatBubble onClick = {createPersonal} style = {{color:'#25D366'}}/>

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
                        return <PrivateChats/>;
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
