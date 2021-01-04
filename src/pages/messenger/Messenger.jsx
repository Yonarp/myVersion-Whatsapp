import React from 'react'
import Chat from '../../components/chat/Chat';
import Sidebar from '../../components/sidebar/Sidebar';
import './Messenger.scss';

function Messenger() {
    return (
        <div className='messenger'>
            <Sidebar/>{/* ------> this is the area where user info and all the users private and group chat appear */}

            <Chat/>{/* ----> this is the page which render the current active chat that the user is chatting in */}
        </div>
    )
}

export default Messenger
