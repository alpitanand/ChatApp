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
    socket.emit('newMessage',{
        from:'Admin',
        text:'Welcome to the chatApp'
    })
    socket.broadcast.emit('newMessage',{
            from:'Admin',
            text:'New user joined',
            createdAt:Math.floor(Date.now() / 1000)
        })
    socket.on('disconnect', () => {
        console.log('Disconneccted from server')
    });
   
     
    socket.on('createEmail', (newEmail) => {
        console.log(newEmail);
    });
    socket.on('createMessage',(message)=>{
        console.log("create message",message);
        io.emit('newMessage',{
            from:message.from,
            text:message.text,
            createdAt:Math.floor(Date.now() / 1000)
        })
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
