const path = require('path');
const publicPath = path.join(__dirname, '../public');
const socketIO = require('socket.io');
const http = require('http');
const express = require('express')
const app = express();
const port = process.env.PORT || 3000;

var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));
io.on('connection', (socket) => {
    console.log('New user connected from server');
    socket.on('disconnect', () => {
        console.log('Disconneccted from server')
    });
    socket.emit('newEmail', {
        from: "alpitanand20@gmail.com",
        text: "Hey prachee i will be back home soon",
        number: 9778260806,
        createdAt: Math.floor(Date.now() / 1000)
    });
    socket.emit('newMessage',{
        from: "Alpit anand",
        message : "This is the new message generated",
        timestamp : Math.floor(Date.now() / 1000)
    });
    socket.on('createEmail', (newEmail) => {
        console.log(newEmail);
    });
    socket.on('createMessage',(message)=>{
        console.log("create message",message);
    });
})

server.listen(port, () => {
    console.log(`Server is up on ${port}`);
})
