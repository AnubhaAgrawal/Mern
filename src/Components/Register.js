import React, {useState, useRef, useEffect} from 'react';
import AuthService from '../Services/AuthService';
import Message from './Message';

const Register = (props) =>{
    const [user, setUser] = useState({username: "", password: "", role: ""});
    const [message, setMessage] = useState(null);
    let timeId = useRef(null);

    useEffect(()=>{
        return () => clearTimeout(timeId);
    }, []);

    const onChange = (e) =>{
        //e.preventDefault();
        setUser({...user, [e.target.name]: e.target.value});
        //console.log(user);
    }
    const resetForm = () =>{
        setUser({username: "", password: "", role: ""});
    }
    const onSubmit = (e) =>{
        e.preventDefault();
       AuthService.register(user).then(data =>{
           console.log(data);
           const {message} = data;
           setMessage(message);
           resetForm();
           if(!message.msgError){
               timeId = setTimeout(()=>{
                   props.history.push('/login');
               },2000)
           }
         
       })
    }
    return(
        <div>
            <form onSubmit = {onSubmit}>
                <h2>Please Signup</h2>
                <label htmlFor = "username" className = "sr-only"> Username: </label>
                <input type = "text" name = "username" value = {user.username} onChange = {onChange} className= "form-control" placeholder = "Enter userName"/>

                <label htmlFor = "password" className = "sr-only"> Password: </label>
                <input type = "password" name = "password" value = {user.password} onChange = {onChange} className= "form-control" placeholder = "Enter Password"/>
                <input type = "text" name = "role" value = {user.role} onChange = {onChange} className= "form-control" placeholder = "Enter Role"/>
                <button className = "btn btn-lg btn-primary btn-block" type = "submit">Register</button>
            </form>
            {message ? <Message message = {message}/> : null}
        </div>
    )
}

export default Register;