import { Avatar } from '@material-ui/core';
import React, {useEffect, useRef, useCallback, memo} from 'react'
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import './Message.scss';

function Message({data, isLast}) {
    const user = useSelector(selectUser);
    const bubbleRef = useRef();

    const scrollIntoView = useCallback(() => bubbleRef?.current?.scrollIntoView(), []);
    useEffect(() => {
        if(isLast){
            scrollIntoView();
        }
    }, [isLast, scrollIntoView]);

    return (
        <div ref={bubbleRef} className = {`text ${(user.email === data.email)? 'user': ''}`}>
            <Avatar src = {data.userImage} style={{height:'30px',width:'30px'}} className='text-photo'/>
            <p class = {`text-message`}> {data.message} </p>
            <small>{new Date(data.timestamp?.toDate()).toLocaleString()}</small>   
        </div>
    )
}


export default memo(Message);
