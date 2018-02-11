var socket = io(); //create socket param interact with server .

socket.on('connect',function() {
    console.log('connected to server');
});

socket.on('disconnect', function() {
    console.log('Disconnected to server');
});

socket.on('newMessage', function(message) {
   console.log('New message', message);
});

socket.emit('createMessage', {
   from: 'Jimmy',
   text: 'Hi!'
});
