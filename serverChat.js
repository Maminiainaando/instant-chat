const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const pool = require('./db/db');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
app.use(bodyParser.json());
app.use(express.static('public'));
// Routes
app.get('/', (req, res) => {
res.sendFile(__dirname + '/public/index.html');
});
app.get('/login', (req, res) => {
res.sendFile(__dirname + '/public/login.html');
});
app.get('/signup', (req, res) => {
res.sendFile(__dirname + '/public/signup.html');
});
app.post('/signup', async (req, res) => {
const { username, password } = req.body;
const hashedPassword = await bcrypt.hash(password, 10);
const client = await pool.connect();
try {
await client.query('INSERT INTO users (username, password) VALUES ($1, $2)',
[username, hashedPassword]);
res.status(201).json({ message: 'User created' });
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Internal Server Error' });
} finally {
client.release();
}
});
app.post('/login', async (req, res) => {
const { username, password } = req.body;
const client = await pool.connect();
try {
const result = await client.query('SELECT username,email,status_user FROM users WHERE username = $1',
[username]);
if (result.rows.length > 0) {
const user = result.rows[0];
const validPassword = await bcrypt.compare(password, user.password);
if (validPassword) {
res.status(200).json({ message: 'Login successful' });
} else {
res.status(401).json({ message: 'Invalid credentials' });
}
} else {
res.status(401).json({ message: 'Invalid credentials' });
}
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Internal Server Error' });
} finally {
client.release();
}
});
io.on('connection', (socket) => {
console.log('New client connected');
socket.on('disconnect', () => {
console.log('Client disconnected');
});
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});
