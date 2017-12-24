var socket = io();
socket.on('connect', function () {
    console.log('Connected to server');
    
})
socket.on('disconnect', function () {
    console.log('Disconneccted from server');
})

socket.on('newEmail', function (email) {
    console.log(email);
    
})

socket.on('newMessage',function(message){
    console.log(message);
    var html = '<li>%item%</li>'
    var newHtml = html.replace('%item%', `${message.from}: ${message.text}`)
    
    document.getElementById('text_messages').insertAdjacentHTML('beforeend',newHtml);
})


document.getElementById('message-form').addEventListener('submit',function(e){
e.preventDefault();

socket.emit('createMessage',{
    from:'User',
    text : document.querySelector('.message').value
    },function(data){
        console.log(data);
    })
    
    document.querySelector('.message').value= "";
});