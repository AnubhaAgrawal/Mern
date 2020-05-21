import React, {useState, useContext, useEffect} from 'react';
import ChatItem from './ChatItem';
import ChatService from '../Services/ChatService';
import Message from './Message'
import {AuthContext} from './Context';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles((theme) => ({
    root: {
     padding: theme.spacing(3,2),
    },
      flex: {
          display: 'flex',
          alignItems: 'center',
      },
      topicwindow:{
          width: '30%',
          height: '300px',
          borderRight: '1px solid grey',
      },
      chatwindow:{
        width: '70%',
        height: '300px',
        padding: '20px',
      },
      chatBox:{
        width: '85%',
      },
      button:{
        width: '15%',
      }

  
  }));

const Chats = props =>{
    const [chat, setChat] = useState({name: ""});
    const [chats, setChats] = useState([]);
    const [message, setMessage] = useState(null);
    const [userName, setUserName] = useState("");
    const [userList, setLists] = useState([]);
    const authContext = useContext(AuthContext);
    const [presentTopic, changepresentTopic] = useState(userList[0]);

    const classes = useStyles();
    useEffect(()=>{
        ChatService.getChats().then(data =>{
            setChats(data.chats);
        });
    }, []);

    const onChange = (e) =>{
        //e.preventDefault();
        setChat({name: e.target.value});
        //console.log(user);
    }
    const resetForm = () =>{
        setChat({name: ""});
      
    }
    const onSubmit = (e) =>{
        e.preventDefault();
        ChatService.postChat(chat).then(data =>{
            console.log(data);
           const {message} = data;
           resetForm();
           if(!message.msgError){
               ChatService.getChats().then(data1 =>{
                  // console.log("In chats: ")
                   console.log(data1);
                   setUserName(data1.user);
                   setChats(data1.chats);
                   setLists(data1.list);
                   setMessage(message);
               });
           }
           else if(message.msgBody === "UnAuthorized"){
               setMessage(message);
               authContext.setUser({username: "", role: ""});
               authContext.setIsAuthenticated(false);

           }
           else{
               setMessage(message);
           }
        });
    }

  
    return(
        <div className={classes.root}>
            

              <Typography variant="h2" component="h3" gutterBottom>
                List of all registered user
            </Typography>

            <Typography variant="h4" component="h4">
                {presentTopic}
            </Typography>
          
            <List>
                    {userList.map(topic =>(
                        <ListItem onClick = {e => changepresentTopic(e.target.innerText)} key = {topic._id} button>
                        <ListItemText primary={topic.username} />
                        </ListItem>
                    ))
                    }

                </List>
       
        <Button variant="contained" color="primary" onClick = {onSubmit} >
           Want to see list of all registered user
        </Button>
     
       
        {message && <Message message = {message}/>}
        </div>
    )
}

export default Chats;