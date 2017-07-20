var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require("socket.io").listen(server),
    nicknames = {},
    mqtt = require('mqtt'),
    client = mqtt.connect('mqtt://localhost:1883');

client.on('connect', function () {
  client.subscribe('temperatura')
  client.subscribe('humedad')
  client.subscribe('velocidad')
  //client.publish('temperatura', String(temp))
});

client.on('message', function (topic, message) {
  if(topic == "humedad"){
    console.log("es humedad");
  }
  if(topic == "temperatura"){
    console.log("es temperatura");
  }
  if(topic == "velocidad"){
    console.log("es viento");
  }
  // message is Buffer
  console.log(message.toString())
  //client.end()
});

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
