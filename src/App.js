import React from 'react';
import Navbar from './Components/Navbar';
import {BrowserRouter,Route} from 'react-router-dom';
import Home from './Components/Home'
import Login from './Components/Login';
import Register from './Components/Register';
import Chats from './Components/Chats';

function App() {
 
  return (
    <BrowserRouter>
    <Navbar/>
    <Route exact path = "/" component = {Home}/>
    <Route path = "/login" component = {Login}/>
    <Route path = "/register" component = {Register}/>
    <Route path = "/chats" component = {Home}/>
    
    </BrowserRouter>
   
  );
}

export default App;
