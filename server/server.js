const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');


const publicPath = path.join(__dirname,'../public');//get a corret path address
const port = process.env.PORT || 3000 ;//configure port pram on heroku
var app = express();//caeate express mdiileware
var server = http.createServer(app);//create server
var io = socketIO(server); //create socket communicate with client on server .


app.use(express.static(publicPath));

io.on('connection',(socket) => { //pass socket parma communciate with client
     console.log('New user connected');

     socket.emit('newMessage', {

      from : 'admin' ,
      text : 'hello'
       
     });

     socket.on('createMessage', (Message) => {
          console.log('createMessage', Message);
     });

     socket.on('disconnect', () => {
     console.log('User disconnected');
   });
});




server.listen(port, () => {
   console.log(`server is up on ${port}`); // using `` template literals by ECMAScript 6 feature
});
