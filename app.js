var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require("socket.io").listen(server),
	nicknames = {},
	mqtt = require('mqtt'),
	client = mqtt.connect('mqtt://localhost:1883'),
	Sensor = require("./models/sensor").Sensor,
	document = require("min-document");

//datos de prueba de sensores
var temp = 65.5;
var id = "sergio/";
var messageTemp = id + String(temp);
var splitMessage = " ";

//subscribe a los topicos de los sensores
client.on('connect', function() {
	client.subscribe('temperatura');
	client.subscribe('humedad');
	client.subscribe('velocidad');
	client.subscribe('presion');
	client.subscribe('puntoRocio');
	client.subscribe('velViento');
	client.subscribe('dirViento');
	client.subscribe('mmAgua');
	client.subscribe('UV');
	client.subscribe('lummens');
	//Publica de prueba
	client.publish('temperatura', messageTemp);
});

//Carga de los datos obtenidos a mongoDB
client.on('message', function(topic, message) {
	splitMessage = message.toString().split("/");
	var sensor = new Sensor({
		paramSensor: String(topic),
		dato: String(splitMessage[0]),
		idTotem: String(splitMessage[1]),
		fechaYHora: Date()
	});

	//console.log("Mostrando informacion");
	//console.log(String(topic));
	//console.log(String(splitMessage[1]));

	//

	sensor.save(function(err) {
		if (err) {
			console.log(err);
		} else {
			console.log("los datos fueron cargados a la db");
		}
	})
});

//Puerto donde corre el sistema
server.listen(8080);

//Ruteo a las paginas
app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/views/index.html');
});
app.get('/chat', function(req, res) {
	res.sendFile(__dirname + '/views/chat.html');
});
app.get('/dashboard',function(req,res){
  Sensor.find({paramSensor: "puntoRocio"},function(err,sensor){
		console.log(sensor[sensor.length-1]);
	});io.sockets.emit('send temperatura', "34");
	Sensor.find({paramSensor: "temperatura"},function(err,sensor){
		console.log(sensor[sensor.length-1]);
	});
	Sensor.find({paramSensor: "humedad"},function(err,sensor){
		console.log(sensor[sensor.length-1]);
	});
	res.sendFile(__dirname + '/views/dashboard.html');
});

// io.sockets.emit('send temperatura', "34");

// io.emit('send temperatura', "34");

//io.sockets.on('connection', function(socket) {
//		socket.emit('send temperatura', "34");
//});

// io.connect().emit('send temperatura', "34");

//Sistema de Chat
io.sockets.on('connection', function(socket) {
	socket.on('send temperatura', function(data) {
		console.log(data);
		io.sockets.emit('new temperatura', {
			value: data
		});
	});

	socket.on('send message', function(data) {
		io.sockets.emit('new message', {
			msg: data,
			nick: socket.nickname
		});
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
		if (!socket.nickname) return;
		delete nicknames[socket.nickname];
		updateNickNames();
	});

	function updateNickNames() {
		io.sockets.emit('usernames', nicknames);
	}

});
