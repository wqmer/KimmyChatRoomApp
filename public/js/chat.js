var socket = io(); //create socket param interact with server .


function scrollToBottom () {
  // Selectors
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child')
  // Heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
}



socket.on('connect',function() {
    var params = jQuery.deparam(window.location.search);
    socket.emit('join',params, function(err){
      if (err){
          alert(err);
       window.location.href ='/';
      }else{
          console.log("No error") ;
      }
    });
});

socket.on('disconnect', function() {
    console.log('Disconnected to server');
});

socket.on('updateUserList', function (users) {
  var ol = jQuery('<ol></ol>');
  users.forEach(function (user) {
      ol.append(jQuery('<li></li>').text(user));
  });
  jQuery('#users').html(ol);
});

socket.on('newMessage', function(message) {
      var formattedTime = moment(message.createdAt).format('h:mm a');
      var template = jQuery('#message-template').html();
      var html = Mustache.render(template , {
          text: message.text ,
          from: message.from ,
          createdAt: formattedTime
      });
         jQuery('#messages').append(html);
   // console.log('New message', message);
   // var Li = jQuery('<li></li>');
   // Li.text(`${message.from} ${formattedTime}: ${message.text}`);
   // jQuery('#message').append(Li);
         scrollToBottom ();
});

// socket.emit('createMessage',{
//    from: 'Jimmy',
//    text: 'Hi!'
//  }, function(data) {
//     console.log(data);
//  });


jQuery('#message-form').on('submit', function (e) {
   e.preventDefault();
    var messageTextbox = jQuery('[name=message]');

   socket.emit('createMessage', {
     text: messageTextbox.val()
  }, function () {
      messageTextbox.val('')
  });
});

socket.on('newLocationMessage', function(message) {
     var formattedTime = moment(message.createdAt).format('h:mm a');
    // var a = jQuery('<a target="_blank">My current location</a>');
        // a.attr('href', message.url);
     var template = jQuery('#location-template').html();
     var html = Mustache.render(template , {
         url: message.url ,
         from: message.from ,
         createdAt: formattedTime
     });
     jQuery('#messages').append(html);
   // Li.text(`${message.from} ${formattedTime}:`);

   // Li.append(a);
   // jQuery('#messages').append(Li);

     scrollToBottom ();
});



var locationButton = jQuery ('#send-location');
locationButton.on('click', function () {
   if(!navigator.geolocation){
        return alert('Geolocation does not work on your browser.');
   }
   navigator.geolocation.getCurrentPosition(function (position) {
     socket.emit('createLocationMessage', {
      lat : position.coords.latitude,
      log : position.coords.longitude
    });
    // console.log (position);
  }, function () {
    alert('Can not fitch your location information.');
  });
});
