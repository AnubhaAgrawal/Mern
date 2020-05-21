const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);


app.get('/', (req, res) => {
  res.send('<h1> Hello world</h1>');
});

io.on('connection', function(socket){
   console.log('a user connected')
   socket.on('chat message', function(msg) {
    console.log(msg);
    io.emit('chat message', msg);
  });

  });

  const PORT = process.env.PORT || 3001;


http.listen(PORT, function(){
    console.log('listening on 3001')
});