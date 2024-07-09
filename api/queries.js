const Pool = require('pg').Pool
const pool = new Pool({
  user: 'chat',
  host: 'localhost',
  database: 'chat_app',
  password: '1234',
  port: 5432,
})
const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id_user ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
const getUserById = (request, response) => {
  const id=parseInt(request.params.id)
  pool.query('SELECT * FROM users WHERE id_user = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
const getAllMessageByUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM messages WHERE id_user = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
const getMessageSendByUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM messages WHERE id_user = $1 and type_message="send"', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
const getMessageReceivedByUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM messages WHERE id_user = $1 and type_message="received"', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {
  const { username, email, status_user, password } = request.body

  pool.query('INSERT INTO users (username, email, status_user, password) VALUES ($1, $2, $3, $4)', [username, email, status_user, password], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.insertId}`)
  })
}
const createMessage = (request, response) => {
  const { messages, id_user, sending_date, date_created, type_message } = request.body

  pool.query('INSERT INTO messages (messages, id_user, sending_date, date_created, type_message) VALUES ($1, $2, $3, $4, $5)', [messages, id_user, sending_date, date_created, type_message], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.insertId}`)
  })
}
const updatePassword = (request, response) => {
  const id = parseInt(request.params.id)
  const { username, email, status_user, password } = request.body

  pool.query(
    'UPDATE users SET password = $4 WHERE id_user = $4',
    [username, email, status_user, password, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}
const deleteMessage = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM messages WHERE id_message = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  deleteUser,
  getAllMessageByUser,
  getMessageReceivedByUser,
  getMessageSendByUser,
  createMessage,
  updatePassword,
  deleteMessage,
}