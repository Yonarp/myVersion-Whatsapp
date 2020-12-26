import { Button } from '@material-ui/core'
import React from 'react'
import { auth, provider } from '../../firebase/firebase'
import './Login.scss'


function Login() {
    function signIn(){
    auth.signInWithPopup(provider).catch((error) => {
        console.log(error);
    })
}
    return (
        <div className='login'>
            <Button onClick={signIn}>Log In</Button>
            
        </div>
    )
}

export default Login
