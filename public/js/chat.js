var socket = io();


function scrollToBottom() {
    // Selectors 
    // var messages = document.getElementById('text-messages');
    var messages = jQuery('#text-messages');
    var newMessage = messages.children('li:last-child')
    // Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMEssageHeight = newMessage.prev().innerHeight();
    if (clientHeight + scrollTop + newMessageHeight + lastMEssageHeight >= scrollHeight) {
        console.log("scrolling");
        messages.scrollTop(scrollHeight);

    }

}

socket.on('connect', function () {
    var params = jQuery.deparam(window.location.search);
    socket.emit('join', params, function (err) {
        if (err) {
            window.location.href = '/';
        } else {
            console.log("No error");
        }
    })

})
socket.on('disconnect', function () {
    console.log('Disconneccted from server');
})

socket.on('newMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = document.getElementById('message-template').innerHTML;
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });
    document.getElementById('text-messages').insertAdjacentHTML('beforeend', html);
    scrollToBottom();

    // var formattedTime = moment(message.createdAt).format('h:mm a'); 
    // var html = '<li>%item%</li>'
    // var newHtml = html.replace('%item%', `${message.from} ${formattedTime}: ${message.text}`)

    // document.getElementById('text-messages').insertAdjacentHTML('beforeend', newHtml);
})

socket.on('newLocationMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = document.getElementById('location-message-template').innerHTML;
    var html = Mustache.render(template, {
        createdAt: formattedTime,
        from: message.from,
        location: message.url
    });
    document.getElementById('text-messages').insertAdjacentHTML('beforeend', html);
    scrollToBottom();

    // var html = '<li>%item2%<a href = "%item%" target = "_blank"> My location</a></li>'
    // var newHtml = html.replace('%item%', `${message.url}`)
    // var newHtml2 = newHtml.replace('%item2%', `${message.from} ${formattedTime}: `)
    // document.getElementById('text-messages').insertAdjacentHTML('beforeend', newHtml2);
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
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })

    }, function () {
        alert('Unable to share location');
    })
})