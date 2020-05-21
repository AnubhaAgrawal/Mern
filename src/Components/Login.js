import React, {useState, useContext} from 'react';
import AuthService from '../Services/AuthService';
import Message from './Message';
import {AuthContext} from './Context';


const Login = (props) =>{
    const [user, setUser] = useState({username: "", password: ""});
    const [message, setMessage] = useState(null);
    const authContext = useContext(AuthContext);

    const onChange = (e) =>{
       // e.preventDefault();
        setUser({...user, [e.target.name]: e.target.value});
        //console.log(user);
    }
    const onSubmit = (e) =>{
        e.preventDefault();
       AuthService.login(user).then(data =>{
           
           const {isAuthenticated, user, message} = data;
           console.log(user.username);
           if(isAuthenticated){
               authContext.setUser(user);
               authContext.setIsAuthenticated(isAuthenticated);
               console.log(props);
               props.history.push('/chats');
           }
           else{
               setMessage(message);
           }
       })
    }
    return(
        <div>
            <form onSubmit = {onSubmit}>
                <h2>Please Sign-in</h2>
                <label htmlFor = "username" className = "sr-only"> Username: </label>
                <input type = "text" name = "username" onChange = {onChange} className= "form-control" placeholder = "Enter userName"/>

                <label htmlFor = "password" className = "sr-only"> Password: </label>
                <input type = "password" name = "password" onChange = {onChange} className= "form-control" placeholder = "Enter Password"/>

                <button className = "btn btn-lg btn-primary btn-block" type = "submit">Login</button>
            </form>
            {message ? <Message message = {message}/> : null}
        </div>
    )
}

export default Login;