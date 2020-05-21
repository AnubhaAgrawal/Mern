export default{
    getChats :() =>{
        return fetch('/users/chats')
        .then(res =>{
            if(res.status !== 401){
                return res.json().then(data => data);
            }
            else{
                return {message:{msgBody: "UnAuthorized"}, msgError: true};
            }
        }).catch((err)=>{
            console.log(err);
        });
    },

    postChat : chat =>{
        return fetch('/users/chat',{
            method : "post",
            body: JSON.stringify(chat),
            headers: {
                'Content-Type':  'application/json',
                'Accept': 'application/json'
            }
        }).then(res => {
            if(res.status !== 401)
                return res.json().then(data => data);
             else
                return {message:{msgBody: "UnAuthorized"}, msgError: true};   
        }).catch((err)=>{
            console.log(err);
        });
    }
}