import { Avatar, IconButton } from '@material-ui/core'
import { CreateOutlined, Search } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/userSlice'
import { db,auth } from '../../firebase/firebase'
import SidebarChat from '../sidebarChat/SidebarChat'
import './Sidebar.scss'



function Sidebar() {
    const user = useSelector(selectUser);
    const [chats,setChats] = useState([]);

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
    },[])

    function createChat(){
        const chatName = prompt("Enter The Chat Name Here");
        if(chatName){
            db.collection('chats').add({
                chatName:chatName,
            })
        }
    }

    return (
        <div className= 'sidebar'>
      
            <div className="sidebar-header">
                <IconButton onClick={() => auth.signOut()}>
                <Avatar src = {user.userImage}  className='sidebar-avatar'/>
                </IconButton>
                <div className="sidebar-input">
                    <Search style = {{color:'blue'}} />
                    <input type="search" placeholder='Search'/>
                </div>
                <IconButton variant = 'outlined' className="sidebar-button">
                    <CreateOutlined onClick = {createChat}/>
                </IconButton>
            </div>
            <div className="sidebar-chats">
               {chats.map((chat) => (
                   <SidebarChat key = {chat.id} id = {chat.id} chatName = {chat.data.chatName}/>
               )

               )}

            </div>
        </div>
    )
}

export default Sidebar
