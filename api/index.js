const express = require('express');
const app = express();
const db = require('./queries');
const port = 3000;
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ info: 'Node.js, Express, and Postgres API' });
});

app.post('/login', db.login);
app.get('/users', db.getUsers);
app.post('/users', db.createUser);
app.put('/users/:id/:password', db.updatePassword);
app.put('/users/:id/:status', db.updateStatus);
app.delete('/users/:id', db.deleteUser);
app.get('/listuser', db.listUsers);
app.get('/allMessage/:id', db.getAllMessage);
app.post('/message', db.createMessage);
app.delete('/message/:id', db.deleteMessage);

app.post('/adduser', async (req, res) => {
  try {
    const { username, email, gender, statusUser, password, image_user } = req.body;
    await db.addUserWithImage(username, email, gender, statusUser, password, image_user);
    res.status(201).send('User added successfully with image.');
  } catch (error) {
    console.error('Error adding user with image:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
