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
    var formattedTime = moment(message.createdAt).format('h:mm a'); 
    var html = '<li>%item%</li>'
    var newHtml = html.replace('%item%', `${message.from} ${formattedTime}: ${message.text}`)

    document.getElementById('text-messages').insertAdjacentHTML('beforeend', newHtml);
})

socket.on('newLocationMessage', function(message){
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var html = '<li>%item2%<a href = "%item%" target = "_blank"> My location</a></li>'
    var newHtml = html.replace('%item%', `${message.url}`)
    var newHtml2 = newHtml.replace('%item2%', `${message.from} ${formattedTime}: `)
    document.getElementById('text-messages').insertAdjacentHTML('beforeend', newHtml2);
})

document.getElementById('send-text').addEventListener('click', function (e) {
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

locationButton.addEventListener('click', function (e) {
    e.preventDefault();
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