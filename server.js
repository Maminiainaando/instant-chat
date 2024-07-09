const express=require('express');
const http=require('http');
const fetch = require('node-fetch'); 
const app = express();
const server = http.createServer(app);
const {Server} = require("socket.io");
app.use(express.static(__dirname));
app.use(express.static(__dirname +"/pages/login"));
const io =new Server(server);

app.post('/logout', async (req, res) => {
    try {
        const id = req.params.id;
        const username = req.params.username;
        const email = req.params.email;
        const status_user = req.params.status_user;
        const password = req.params.password;
        const response = await fetch(`http://localhost:3000/users/${id}/${username}/${email}/${status_user}/${password}`);
        const data = await response.json(); 
        res.json(data); 
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve user' });
    }
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
server.listen(3001,()=>{
  console.log('Listening on port:3001');  
})