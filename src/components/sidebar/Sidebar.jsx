import { Avatar, IconButton } from '@material-ui/core'
import { CreateOutlined, Search } from '@material-ui/icons'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/userSlice'
import SidebarChat from '../sidebarChat/SidebarChat'
import './Sidebar.scss'



function Sidebar() {
    const user = useSelector(selectUser);
    return (
        <div className= 'sidebar'>
      
            <div className="sidebar-header">
                <Avatar src = {user.userImage} className='sidebar-avatar'/>
                <div className="sidebar-input">
                    <Search style = {{color:'blue'}} />
                    <input type="search" placeholder='Search'/>
                </div>
                <IconButton variant = 'outlined' className="sidebar-button">
                    <CreateOutlined/>
                </IconButton>
            </div>
            <div className="sidebar-chats">
                <SidebarChat/>
                <SidebarChat/>

            </div>
        </div>
    )
}

export default Sidebar
