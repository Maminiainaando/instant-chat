const express=require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require("socket.io");

app.use(express.static(__dirname));

app.use(express.static(__dirname +"/pages"));

const io =new Server(server);

app.get('/', (req, res)=>{

    res.sendFile(__dirname + "/index.html");

});


io.on('connection',(socket)=>{
    console.log('a user connected')
    socket.on("typing-event", (data) => {
        socket.broadcast.emit("typing-event",data);
        console.log("typing-event")
    });
    socket.on("message-event", (data) => {
        socket.broadcast.emit("message-event", data);
        console.log("message-event")
    });
}) 

server.listen(3001,()=>{
    console.log('Listening on port:3001');  
})
