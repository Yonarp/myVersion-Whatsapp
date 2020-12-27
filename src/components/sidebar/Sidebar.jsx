import { Avatar, IconButton } from '@material-ui/core'
import { ChatBubble, CreateOutlined, Search } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/userSlice'
import { db,auth } from '../../firebase/firebase'
import PrivateChats from '../privateChats/PrivateChats'
import SidebarChat from '../sidebarChat/SidebarChat'
import './Sidebar.scss'



function Sidebar() {
    const user = useSelector(selectUser);
    const [chats,setChats] = useState([]);
    const [existingId,setExistingId] = useState()
    
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
        db.collection('private_chats').get().then((snapshot)=> {
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

     async function createPersonal (){
         let flag = 0;
       const id = prompt('Please Enter the id here ');
       if(id){
       existingId?.forEach(ids => {
           if((id === ids.uid1 ) || (id === ids.uid2))
           {
                flag = 1
                alert('convo already exists');
                return;
           }
        } )
        if(flag === 1) return;
       
       const snapshot = await db.collection('users').doc(id).get();

       const arr = snapshot?.data()?.uid;
        if(arr){
            db.collection('private_chats').doc().set({
                uid1:user.uid,
                uid2:arr
            })
        }
    }
    else return;
}
    console.log(existingId);

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
                <IconButton variant = 'outlined'>
                    <ChatBubble onClick = {createPersonal}/>
                </IconButton>
            </div>
            <div className="sidebar-chats">
               {chats.map((chat) => (
                   <SidebarChat key = {chat.id} id = {chat.id} chatName = {chat.data.chatName}/>
               )

               )}

            </div>
            <div className="sidebar-private-chats">

                <PrivateChats/>
            </div>
        </div>
    )
}

export default Sidebar
