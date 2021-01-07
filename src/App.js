import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.scss';
import Login from './components/login/Login';
import { selectDarkMode } from './features/darkModeSlice';
import { login, logout, selectUser } from './features/userSlice';
import { auth, db } from './firebase/firebase';
import Messenger from './pages/messenger/Messenger';

function App() {
   const user = useSelector(selectUser);
   const dispatch = useDispatch();

   
   /* A state to check if user has activated dark mode  */
   const isDark = useSelector(selectDarkMode);
   

/*    console.log('themeclassName =', themeClassName, '  valueOfIsDark ==' , isDark); */
   
   useEffect(() => {
     /* Fetching the user through Firebase and storing it locally in redux */
    auth.onAuthStateChanged((authUser)=> {
      if(authUser) {
        dispatch(login({
          uid: authUser.uid,
          displayName: authUser.displayName,
          email: authUser.email,
          userImage: authUser.photoURL,
        }));


        /* Making a user collection in firebase  */
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
    <div className={`App ${isDark? 'dark' : 'light'}`}>
      {
        /* if user is not logged in we render the log in page  */
       user ? <Messenger/>:<Login/>

      }
    </div>
  );
}

export default App;


