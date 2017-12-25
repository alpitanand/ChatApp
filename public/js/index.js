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

socket.on('newMessage', function (message) {
    console.log(message);
    var html = '<li>%item%</li>'
    var newHtml = html.replace('%item%', `${message.from}: ${message.text}`)

    document.getElementById('text_messages').insertAdjacentHTML('beforeend', newHtml);
})

socket.on('newLocationMessage', function(message){
    var html = '<li>%item2%<a href = "%item%" target = "_blank"> My location</a></li>'
    var newHtml = html.replace('%item%', `${message.url}`)
    var newHtml2 = newHtml.replace('%item2%', `${message.from}: `)
    document.getElementById('text_messages').insertAdjacentHTML('beforeend', newHtml2);
})

document.getElementById('message-form').addEventListener('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: document.querySelector('.message').value
    }, function (data) {
        console.log(data);
    })

    document.querySelector('.message').value = "";
});

var locationButton = document.getElementById('send-location');

locationButton.addEventListener('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }
    navigator.geolocation.getCurrentPosition(function (position) {
        console.log(position);
        socket.emit('createLocationMessage',{
            latitude: position.coords.latitude,
            longitude : position.coords.longitude
        })

    }, function () {
        alert('Unable to share location');
    })
})