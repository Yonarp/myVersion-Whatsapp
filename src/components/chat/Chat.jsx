import React, { useState } from 'react'
import './Chat.scss';

function Chat() {

    const [input,setInput] = useState('')

    function submition(e){
        e.preventDefault()
    }
    return (
        <div className='chat'>
            <div className="chat-header">
                <h1>To:<span className='chat-header-contact'> Contact Name </span></h1>
                <h2>Details</h2>
            </div>
            <div className="chat-messages">

            </div>

             
                <form onSubmit={submition} className="chat-input" >
                    <input value={input} onChange={e => setInput(e.target.value) } type='text' placeholder='Message here'/>
                    <button type='submit'/>
                </form>

            
        </div>
    )
}

export default Chat
