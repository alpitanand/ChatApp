const path = require('path');
const publicPath = path.join(__dirname, '../public');
const socketIO = require('socket.io');
const http = require('http');
const express = require('express')
const app = express();
const port = process.env.PORT || 3000;
const {generateMessage} = require('./utils/message');

var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));
io.on('connection', (socket) => {
    console.log('New user connected from server');

    socket.emit('newMessage',generateMessage('Admin','Welcome to the chat App'));
    socket.broadcast.emit('newMessage',generateMessage('Admin','New User connected'));
    
    socket.on('disconnect', () => {
        socket.broadcast.emit('newMessage',generateMessage('Admin','User disconnected'));
        console.log('Disconneccted from server')
    });
   
    socket.on('createMessage',(message,callback)=>{
        console.log("create message",message);
        io.emit('newMessage',generateMessage(message.from, message.text));
        callback('This is from the server');
        // socket.broadcast.emit('newMessage',{
        //     from:message.from,
        //     text:message.text,
        //     createdAt:Math.floor(Date.now() / 1000)
        // })
    });
})
 
server.listen(port, () => {
    console.log(`Server is up on ${port}`);
})

