var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);


app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "jade");

io.sockets.on("connection", function(socket){
  socket.on("sendMessage", function(data){
    io.socket.emit("newMessage", {msg: data});
  });
});

app.get("/",function(req,res){
  res.render("index");
});

app.get("/chat",function(req,res){
  res.render("chat");
});

app.get("/dashboard",function(req,res){
  res.render("dashboard");
});

app.listen(8080);
