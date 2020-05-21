import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import AuthService from '../Services/AuthService';
import {AuthContext} from './Context';

const Navbar = props =>{
    const {isAuthenticated, user, setIsAuthenticated, setUser} = useContext(AuthContext);
    
    const handleLogout = () =>{
        AuthService.logout().then(data =>{
           console.log(data);
           /* if(data.success){
                setUser(data.user);
                setIsAuthenticated(false);
            } */
            if(isAuthenticated)
                setIsAuthenticated(false);
        });
    }
    const unauthenticatedBar = () =>{
        return(
            <React.Fragment>
                <Link to = "/">
                    <li className = "nav-item nav-link">
                        Home
                        
                    </li>               
                </Link>
                <Link to = "/login">
                    <li className = "nav-item nav-link">
                        
                        Login
                    </li>               
                </Link>
                <Link to = "/register">
                    <li className = "nav-item nav-link">
                        Register
                        
                    </li>               
                </Link>
            </React.Fragment>
        )
    }

    const authenticatedBar = () =>{
        return(
            <React.Fragment>
               {/*<h1>{user.username}</h1>*/}
                <Link to = "/">
                    <li className = "nav-item nav-link">
                        Home
                        
                    </li>               
                </Link>
                <Link to = "/chats">
                    <li className = "nav-item nav-link">
                        
                        Chats
                    </li>               
                </Link>
                {
                    user.role === "admin" ?
                    <Link to = "/admin">
                        <li className = "nav-item nav-link">
                            
                            Admin
                        </li>               
                    </Link>:null
                }

                <button type = "button" className = "btn btn-link nav-item nav-link" onClick = {handleLogout}>
                    Logout
                </button>
              
            </React.Fragment>
        )
    }
    
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
           {console.log(user)}
            <Link to = "/">
              <div className="navbar-brand" > Navbar </div>
            </Link>
            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav mr-auto">
                
                    {console.log(isAuthenticated + "Check")}
                    {!isAuthenticated ? unauthenticatedBar() : authenticatedBar()}
                    
                
                </ul>
               
  </div>
</nav>
    )
}

export default Navbar;