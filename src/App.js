import React from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import { selectUser } from './features/counterSlice';
import Messenger from './pages/messenger/Messenger';

function App() {
   const user = useSelector(selectUser);
  return (
    <div className="App">
      {
       user ? <Messenger/>:<h1>You need to login my man</h1>

      }
    </div>
  );
}

export default App;
