var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require("socket.io").listen(server),
    nicknames = {};

server.listen(8080);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/chat', function(req, res) {
    res.sendFile(__dirname + '/views/chat.html');

});
io.sockets.on('connection', function(socket) {
    socket.on('send message', function(data) {
        io.sockets.emit('new message', {msg: data, nick: socket.nickname});
    });

    socket.on('new user', function(data, callback) {
        if (data in nicknames) {
            callback(false);
        } else {
            callback(true);
            socket.nickname = data;
            nicknames[socket.nickname] = 1;
            updateNickNames();
        }
    });

    socket.on('disconnect', function(data) {
        if(!socket.nickname) return;
        delete nicknames[socket.nickname];
        updateNickNames();
    });

    function updateNickNames() {
        io.sockets.emit('usernames', nicknames);
    }
});