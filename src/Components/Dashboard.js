import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {context} from './Store'
import {AuthContext} from './Context';

const useStyles = makeStyles((theme) => ({
    root: {
     padding: theme.spacing(3,3),
    },
      flex: {
          display: 'flex',
          alignItems: 'center',
      },
      text: {
        color: "#0000A0",
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

  export default function Dashboard() {
    const {totalChats, sendChat, user, typingStatus, checkMessage} = React.useContext(context);
    //
    const topics = Object.keys(totalChats);
    const classes = useStyles();
    const [presentTopic, changepresentTopic] = useState(topics[0]);
    
    const [textvalue, changeTextValue] = useState('');
   const [currentUser, changeTypeUser] = useState(typingStatus.from);
    return (
      <div className={classes.root}>
       {/*  <Paper elevation={0} /> */} 
        {/*<Paper />*/}
       
        <Paper elevation={5}>

        <Typography variant="h2" component="h3" gutterBottom>
        Chat App
      </Typography>
     
      <Typography variant="h4" component="h4" gutterBottom>
        {presentTopic}
      </Typography>
       

        <div className = {classes.flex}>
            <div className = {classes.topicwindow}>

                <List>
                    {topics.map(topic =>(
                        <ListItem onClick = {e => changepresentTopic(e.target.innerText)} key = {topic} button>
                        <ListItemText primary={topic} />
                        </ListItem>
                    ))
                    }

                </List>
            </div>
            <div className = {classes.chatwindow}>
                {totalChats[presentTopic].map((chat, i) =>(
                  <div className = {classes.flex} key = {i}>
                    <Chip label= {chat.from} className = {classes.chip}/>
                    
                    <Typography variant = 'body1' gutterBottom> {chat.msg} </Typography>
                  </div>
                ))
                }
            </div>
        </div>
        <div className = {classes.flex}>

          <TextField
           id = "standard-name"
           label = "Send a chat"
           
           className = {classes.chatBox}
           value = {textvalue}
         
           onChange = {e => {changeTextValue(e.target.value)
            sendChat({from: user, typing: true});
            {/*changeTypeUser(typingStatus.from);*/}
          }}
           />

           
        <Button variant="contained" color="primary" onClick = {() => {
          sendChat({from: user, msg: textvalue, topic: presentTopic, typing: false});
         {/* dispatch({type:'RECEIVE_MESSAGE', payload: {from: user, msg: textvalue, topic: presentTopic}}) */}
          changeTextValue('');
          changeTypeUser('');
          //typingStatus.from = '';
        
        }}>
           Send
        </Button>
        
        </div>
        <div className = {classes.text}>
      {typingStatus.typing && (<p>
      {typingStatus.from} is typing</p>)
      }
      </div>

      </Paper>
      </div>
    );
  }