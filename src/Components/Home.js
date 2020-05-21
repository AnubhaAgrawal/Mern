
import React, {useContext} from 'react'
import Store from './Store'
import Dashboard from './Dashboard'
import {AuthContext} from './Context';
import Chats from './Chats';

export default function Home() {
  const {user, setUser, isAuthenticated, setIsAuthenticated} = React.useContext(AuthContext);
  return (
    <div>
      {isAuthenticated ?
      (<Store user = {user.username} check = {isAuthenticated}>
        {console.log("Hello")}
        {console.log(user)}
        <Chats/>
        <Dashboard/>
      </Store>) : <h1>Please First Login to Chat</h1>
      
}
    </div>
  )
}
