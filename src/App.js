import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.scss';
import Login from './components/login/Login';
import { login, logout, selectUser } from './features/userSlice';
import { auth, db } from './firebase/firebase';
import Messenger from './pages/messenger/Messenger';

function App() {
   const user = useSelector(selectUser);
   const dispatch = useDispatch();

   const [dark, setDark] = useState(false);

   let themeClassName = 'light';
   
   if(dark){
    themeClassName = 'dark';
   } else {
    themeClassName = 'light';
   }
   
   useEffect(() => {
    auth.onAuthStateChanged((authUser)=> {
      if(authUser) {
        dispatch(login({
          uid: authUser.uid,
          displayName: authUser.displayName,
          email: authUser.email,
          userImage: authUser.photoURL,
        }));



        console.log(authUser);
        db.collection('users').doc(authUser.uid).set({
          displayName: authUser.displayName,
          uid:authUser.uid,
          email: authUser.email,
          userImage: authUser.photoURL,
        });

      }
      else{
        dispatch(logout());
      } 
    })

  
   },[dispatch]);
  return (
    <div className={`App ${themeClassName}`}>
      {
       user ? <Messenger/>:<Login/>
      }
    </div>
  );
}

export default App;

// users =>
