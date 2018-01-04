const path = require('path');
const publicPath = path.join(__dirname, '../public');
const socketIO = require('socket.io');
const http = require('http');
const express = require('express');
const {Users} = require('./utils/users'); 
const app = express();
const {
    isRealString
} = require('./utils/validation')
const port = process.env.PORT || 3000;
const {
    generateMessage,
    generateLocationMessage
} = require('./utils/message');

var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));
var user = new Users();

io.on('connection', (socket) => {
    console.log('New user connected from server');
    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
           return callback('Room and name are required')
        }
        socket.join(params.room);
        user.removeUser(socket.id);
        user.addUser(socket.id, params.name, params.room);
        io.to(params.room).emit('UpdateUserList', user.getUserList(params.room));
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat App'));
        socket.emit('newMessage', generateMessage('Admin', 'To chat, share the link with the person you want to chat'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
        callback();
    })

    socket.on('disconnect', () => {
        var users = user.removeUser(socket.id);
        console.log(users);
        if(users){
            
            io.to(users.room).emit('UpdateUserList', user.getUserList(users.room));
            io.to(users.room).emit('newMessage',generateMessage('Admin',`${users.name} has left`));
        }
        // socket.broadcast.emit('newMessage', generateMessage('Admin', 'User disconnected'));
        // console.log('Disconneccted from server')
    });


    socket.on('createMessage', (message, callback) => {
        console.log("create message", message);
        var room_user = user.getUser(socket.id);
        io.to(room_user.room).emit('newMessage', generateMessage(message.from, message.text));
        callback('This is from the server');

    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
    })
})

server.listen(port, () => {
    console.log(`Server is up on ${port}`);
})