const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updatePassword)
app.delete('/users/:id', db.deleteUser)

app.get('/allMessage/:id', db.getAllMessageByUser)
app.get('/messageSend/:id', db.getMessageSendByUser)
app.get('/messageReceive/:id', db.getMessageReceivedByUser)
app.post('/message', db.createMessage)
app.delete('/message/:id', db.deleteMessage)


app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
var cors = require('cors')
app.use(cors())