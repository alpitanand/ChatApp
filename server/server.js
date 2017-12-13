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
})

server.listen(3000, () => {
    console.log(`Server is up on ${port}`);
})
