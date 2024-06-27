const express=require('express');
const http=require('http');

const app = express();
const server = http.createServer(app);
const {Server} = require("socket.io");
app.use(express.static(__dirname));
app.use(express.static(__dirname +"/pages/login"));
const io =new Server(server);

app.get('/', (req, res)=>{
    res.sendFile(__dirname + "/index.html");
});

app.get('/login', (req, res)=>{
    res.sendFile(__dirname + "/pages/login/index.html");
});
io.on('connection',(socket)=>{
    console.log('a user connected')
    socket.on("typing-event",(data)=>{
        console.log(data.name +"is currently typing");
    });
    socket.on("message-event",(data)=>{
        socket.broadcast.emit("message-event",data);
    })
}) 
server.listen(3000,()=>{
  console.log('Listening on port:3000');  
})