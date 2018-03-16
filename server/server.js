const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');


const {generateMessage,generateLocationMessage} = require('./utils/message') ;
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname,'../public');//get a corret path address
const port = process.env.PORT || 3000 ;//configure port pram on heroku
var app = express();//caeate express mdiileware
var server = http.createServer(app);//create server
var io = socketIO(server); //create socket communicate with client on server .
var users = new Users();


app.use(express.static(publicPath));

io.on('connection',(socket) => { //pass socket parma communciate with client
     console.log('New user connected');



     socket.on('join',(params,callback)=>{
      if (!isRealString(params.name) || !isRealString(params.room) ) {
        callback('Name and room name are required.') ;
      }

      socket.join(params.room);
      users.removeUser(socket.id);
      users.addUser(socket.id, params.name, params.room);


      io.to(params.room).emit('updateUserList', users.getUserList(params.room));
      socket.emit('newMessage', generateMessage('Admin' , 'Welcome to our chatroom')); //to everyone conneted to te server
      socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin' , `${params.name} has joined`));//boradcast everyone except this socket .
      callback();
     });

     socket.on('createMessage', (message , callback) => {
       var user = users.getUser(socket.id);
       if (user && isRealString(message.text)){
          io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
          callback();
        }
      });

     socket.on('createLocationMessage' , (coords) => {
       var user = users.getUser(socket.id);
       if (user){
          io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.lat, coords.log));
        }
     });

     socket.on('disconnect', () => {
       var user = users.removeUser(socket.id);
       if (user) {
         io.to(user.room).emit('updateUserList', users.getUserList(user.room));
         io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
     }
   });
});

server.listen(port, () => {
   console.log(`server is up on ${port}`); // using `` template literals by ECMAScript 6 feature
});
