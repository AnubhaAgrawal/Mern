import React from 'react'
import io from 'socket.io-client'
import {AuthContext} from './Context'

export const context = React.createContext();

const initState = {
    RoomChat1: [
        {from: 'anubha', msg: 'hello'},
        {from: 'sona', msg: 'hello'},
        {from: 'anula', msg: 'hi'}
    ],
    RoomChat2: [
        {from: 'arron', msg: 'hello'},
        {from: 'arron', msg: 'hello'},
        {from: 'arron', msg: 'hello'}
    ]
}






//const [userName, setUserName] = useState("");



function reducer(state, action){
    const {from, msg, topic, typing} = action.payload
    switch(action.type){
        case 'RECEIVE_MESSAGE':
            if(!typing)
                return {
                    ...state,
                    [topic] :[
                        ...state[topic],
                        { 
                            from, msg
                        }
                    ]
                }
         default:
             return state   
    }
}



let socket;
let fl = 0;
var sendChat = (value) =>{
    console.log('ssend: '+JSON.stringify(value))
    socket.emit('chat message', value);
}

/*var sendChat1 = (value) =>{
    console.log('ssend: '+ JSON.stringify(value))
    //socket.broadcast.emit('typing', value);
}*/
export default function Store(props) {
    const user = props.user;
    const checkMessage = props.check;
    const [totalChats, dispatch] = React.useReducer(reducer, initState)
    const [typingStatus, setTypingStatus] = React.useState({from: '', typing: 'false'})
    if(!socket){
        socket = io(':3001');
        console.log('Hi');
        fl = 1;
    }
    
    if(fl!=0 &&fl<2){
        socket.on('chat message', function(msg){
            setTypingStatus({from: msg.from, typing: msg.typing});

            dispatch({type:'RECEIVE_MESSAGE', payload: msg});
            console.log('JJJ');
           
        })
        fl++;
       //fl = 2
    }
    

    
    
    return (
        <div>
            {console.log(totalChats)}
            <context.Provider value = {{totalChats, sendChat, user, typingStatus, checkMessage}}>
                {props.children}
            </context.Provider>
        </div>
    )
}

