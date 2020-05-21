import React from 'react'
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
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

export default function ChatItem(props) {
    const classes = useStyles();
    return (
        <div className = {classes.flex} >
            <br></br>
        <Chip label= {props.user} className = {classes.chip}/>
            <li>{props.chat.name} </li>
           
        </div>
    )
}
