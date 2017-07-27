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
//var temp = 65.5;
//var id = "sergio/";
//var messageTemp = id + String(temp);
//var splitMessage = " ";

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
	//client.publish('temperatura', messageTemp);
});

//generar el schema para cargar a la db
client.on('message', function(topic, message) {
	splitMessage = message.toString().split("/");
	//Schema sensores
	var sensor = new Sensor({
		paramSensor: String(topic),
		dato: String(splitMessage[1]),
		idTotem: String(splitMessage[0]),
		fechaYHora: Date()
	});

	//Guardar en la db los datos.
	sensor.save(function(err) {
		if (err) {
			console.log(err);
		} else {
			console.log("los datos fueron cargados a la db " + sensor.paramSensor);
		}
	})

	//Condicional para ejecutar la funcion correspondiente a cada dashboard
	if(topic=="temperatura"){
		io.sockets.emit('new temperatura', {
			value: String(splitMessage[1])
		});
		console.log("Emitio el mensaje a new temperatura");
	}

	if(topic=="humedad"){
		io.sockets.emit('new humedad', {
			value: String(splitMessage[1])
		});
		console.log("Emitio el mensaje a new temperatura");
	}

	if(topic=="velocidad"){
		io.sockets.emit('new velocidad', {
			value: String(splitMessage[1])
		});
		console.log("Emitio el mensaje a new temperatura");
	}

	if(topic=="presion"){
		io.sockets.emit('new presion', {
			value: String(splitMessage[1])
		});
		console.log("Emitio el mensaje a new temperatura");
	}

	if(topic=="puntoRocio"){
		io.sockets.emit('new puntoRocio', {
			value: String(splitMessage[1])
		});
		console.log("Emitio el mensaje a new temperatura");
	}

	if(topic=="velViento"){
		io.sockets.emit('new velViento', {
			value: String(splitMessage[1])
		});
		console.log("Emitio el mensaje a new temperatura");
	}

	if(topic=="dirViento"){
		io.sockets.emit('new dirViento', {
			value: String(splitMessage[1])
		});
		console.log("Emitio el mensaje a new temperatura");
	}

	if(topic=="mmAgua"){
		io.sockets.emit('new mmAgua', {
			value: String(splitMessage[1])
		});
		console.log("Emitio el mensaje a new temperatura");
	}

	if(topic=="UV"){
		io.sockets.emit('new UV', {
			value: String(splitMessage[1])
		});
		console.log("Emitio el mensaje a new temperatura");
	}

	if(topic=="lummens"){
		io.sockets.emit('new lummens', {
			value: String(splitMessage[1])
		});
		console.log("Emitio el mensaje a new temperatura");
	}


	//enviar los datos al dashboard
	//io.sockets.on('connection', function(socket){

		//});

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
	res.sendFile(__dirname + '/views/dashboard.html');
});

// io.sockets.emit('send temperatura', "34");

// io.emit('send temperatura', "34");

//io.sockets.on('connection', function(socket) {
//		socket.emit('send temperatura', "34");
//});temperatura

// io.connect().emit('send temperatura', "34");

//Abre conexion con socket
io.sockets.on('connection', function(socket) {
	//Funciones para actualizar los parametros del dashboard
	socket.on('send temperatura', function(data) {
		console.log(data);
		io.sockets.emit('new temperatura', {
			value: data
		});
	});

	socket.on('send humedad', function(data) {
		console.log(data);
		io.sockets.emit('new humedad', {
			value: data
		});
	});

	socket.on('send velocidad', function(data) {
		console.log(data);
		io.sockets.emit('new velocidad', {
			value: data
		});
	});

	socket.on('send presion', function(data) {
		console.log(data);
		io.sockets.emit('new presion', {
			value: data
		});
	});

	socket.on('send puntoRocio', function(data) {
		console.log(data);
		io.sockets.emit('new puntoRocio', {
			value: data
		});
	});

	socket.on('send velViento', function(data) {
		console.log(data);
		io.sockets.emit('new velViento', {
			value: data
		});
	});

	socket.on('send dirViento', function(data) {
		console.log(data);
		io.sockets.emit('new dirViento', {
			value: data
		});
	});

	socket.on('send mmAgua', function(data) {
		console.log(data);
		io.sockets.emit('new mmAgua', {
			value: data
		});
	});

	socket.on('send UV', function(data) {
		console.log(data);
		io.sockets.emit('new UV', {
			value: data
		});
	});

	socket.on('send lummens', function(data) {
		console.log(data);
		io.sockets.emit('new lummens', {
			value: data
		});
	});

	//Funciones para el sistema de chat
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
