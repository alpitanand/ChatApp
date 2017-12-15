var socket = io();
socket.on('connect', function () {
    console.log('Connected to server');
    socket.emit('createEmail',{
        id : 1407258,
        name : "ALpit"
    })
    
})
socket.on('disconnect', function () {
    console.log('Disconneccted from server');
})

socket.on('newEmail', function (email) {
    console.log(email);
})

socket.on('newMessage',function(message){
    console.log(message);
})
