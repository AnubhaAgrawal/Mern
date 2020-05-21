export default {
    login: user =>{
        return fetch('/users/login', {
            method: "post",
            body: JSON.stringify(user),
            headers: {
                'Content-Type':  'application/json',
                'Accept': 'application/json'
            }
        }).then(res => {
            if(res.status !== 401)
                return res.json().then(data => data);
             else
                return {isAuthenticated: false, user: {username: "", role: ""}};     
        });
        
    },

    register: user =>{
        return fetch('/users/register', {
            method: "post",
            body: JSON.stringify(user),
            headers: {
                'Content-Type':  'application/json',
                'Accept': 'application/json'
            }
        }).then(res => res.json())
          .then(data => data);
    },

    logout : () =>{
        return fetch('https://backend12345.herokuapp.com/users/logout')
                .then(res => {
                    if(res.status !== 401)
                        return res.json().then(data => data);
                    else
                        return {user:{username: "", role:""}, success: false};     
                });
    },
    isAuthenticated: () =>{
        return fetch('https://backend12345.herokuapp.com/users/authenticated')
              .then(res => {
                  if(res.status !== 401)
                        return res.json().then(data => data);
                   else
                        return {isAuthenticated: false, user: {username: "", role: ""}};     
              })
              .then(data => data);
    }
}