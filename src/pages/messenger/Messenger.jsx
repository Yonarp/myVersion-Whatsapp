import React from 'react'
import Chat from '../../components/chat/Chat';
import Sidebar from '../../components/sidebar/Sidebar';
import './Messenger.scss';

function Messenger() {
    return (
        <div className='messenger'>
            <Sidebar/>
            <Chat/>
        </div>
    )
}

export default Messenger
